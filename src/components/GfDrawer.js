/**
 * @description
 * @author: 菩萨蛮
 * @date 2020/2/5 1:49 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * TODO 叠加drawer展示问题
 * TODO 蒙版问题
 *      1. 闪烁问题暂时用.v-modal-leave的display:none解决
 *      2. 叠加打开dialog如果设置有蒙版的话存在复用问题
 */
import { Drawer } from 'element-ui'
import Utils from 'element-ui/src/utils/aria-utils';


export default {
    name: 'GfDrawer',
    mixins: [Drawer],
    watch: {
        visible(val) {
            if (val) {
                this.closed = false;
                this.$emit('open');
                const drawer = this.$el.parentElement;
                if (this.appendToBody) {
                    drawer.appendChild(this.$el);
                }
                this.prevActiveElement = document.activeElement;
                this.$nextTick(() => {
                    Utils.focusFirstDescendant(this.$refs.drawer);
                });
            } else {
                if (!this.closed) this.$emit('close');
                this.$nextTick(() => {
                    if (this.prevActiveElement) {
                        this.prevActiveElement.focus();
                    }
                });
            }
        },
        afterLeave() {
            this.$emit('closed');
            document.getElementsByClassName('drawer-model')
        },
    },
}
