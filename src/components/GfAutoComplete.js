/**
 * @description 自动搜索组件
 * @author: 菩萨蛮
 * @date 2020/3/9 5:22 下午
 * @version V2.0.0
 */
import { Autocomplete } from 'element-ui'

export default {
    name: 'GfAutoComplete',
    mixins: [Autocomplete],
    props: ['orderDefaultValue'],
    created() {
        this.setDefaultValue();
    },
    data() {
        return {
            defaultValue: '',
        }
    },
    watch: {
        value() {
            if (this.value === '') {
                this.defaultValue = this.value;
            }
        },
        disabled() {
            this.defaultValue = "";
        },
        orderDefaultValue() {
            this.setDefaultValue();
        }
    },
    methods: {
        setDefaultValue() {
            if (this.orderDefaultValue !== undefined) {
                this.$emit('input', this.orderDefaultValue);
                this.defaultValue = this.orderDefaultValue;
            }
        },
        getData(queryString) {
            if (this.suggestionDisabled) {
                return;
            }
            this.loading = true;
            this.fetchSuggestions(queryString, (suggestions) => {
                this.loading = false;
                if (this.suggestionDisabled) {
                    return;
                }
                if (Array.isArray(suggestions)) {
                    this.suggestions = suggestions;
                    this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
                } else {
                    console.error('[Element Error][Autocomplete]autocomplete suggestions must be an array');
                }
            });
        },
        handleChange(value) {
            this.$emit('input', value);
            this.suggestionDisabled = false;
            if (!this.triggerOnFocus) {
                this.suggestions = [];
                if (!value || value.trim() === '') {
                    this.suggestionDisabled = true;
                    return;
                }
            }
            this.debouncedGetData(value);
        },
        select(item) {
            this.$emit('input', item[this.valueKey]);
            this.$emit('select', item);
            this.$nextTick(_ => {
                this.defaultValue = item[this.valueKey];
                this.suggestions = [];
                this.highlightedIndex = -1;
            });
        },
        handleClear() {
            this.activated = false;
            this.defaultValue = '';
            this.$emit('clear');
        },
        close(e) {
            this.activated = false;
            if (!this.disabled) {
                if (this.value !== this.defaultValue) {
                    this.$emit('input', this.defaultValue);
                    this.debouncedGetData(this.defaultValue);
                } else {
                    if (this.value === '' && this.defaultValue === '') {
                        this.$emit('select', null);
                    }
                }

            }
        }
    }
}
