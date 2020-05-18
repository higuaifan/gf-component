<template>
    <div>
        <gf-auto-complete size="small"
                          name="gf-auto-complete"
                          v-model="completeValue"
                          clearable
                          :disabled="inputDisabled"
                          :order-default-value="defaultValue"
                          :fetch-suggestions="completeSearch"
                          @select="completeSelect"/>
        <span>冒泡值:{{emitValue}}</span>
        <span>默认值:{{defaultValue}}</span>
        <el-button size="mini" type="primary" @click="inputDisabled = !inputDisabled">设置Disabled</el-button>
        <el-button type="primary" @click="updateDefaultValue">设置defaultValue</el-button>
    </div>
</template>

<script>
    import GfAutoComplete from '../components/GfAutoComplete'

    export default {
        name: "CompletePage",
        components: { GfAutoComplete },
        data() {
            return {
                searchList: [{ value: '临江仙' }, { value: '菩萨蛮' }, { value: '三台' }, { value: '湖之鱼' }],
                completeValue: '菩萨蛮',
                completeValue2: '',
                emitValue: '',
                defaultValue: '菩萨蛮',
                inputDisabled: false
            }
        },
        methods: {
            completeSearch(qs, cb) {
                console.log(qs);
                cb(qs !== '' ? this.searchList.filter(s => s.value.indexOf(qs) > -1) : this.searchList);
            },
            completeSelect(item) {
                this.emitValue = item ? item.value : "";
            },
            updateDefaultValue() {
                this.defaultValue = this.defaultValue + '+';
            }
        }
    }
</script>

<style scoped>

</style>
