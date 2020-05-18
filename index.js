// import ElementUI from 'element-ui';
import GfAutoComplete from './src/components/GfAutoComplete';
import GfInputNumber from './src/components/GfInputNumber';
import GfDrawer from './src/components/GfDrawer';
import GfImage from './src/components/GfImage';
import GfSelectTable from './src/components/GfSelectTable';
import GfSelectTableColumn from './src/components/GfSelectTableColumn';
import GfTable from './src/components/GfTable';
import math from './src/plugin/math';
import utils from './src/plugin/utils';

const components = [
    GfAutoComplete,
    GfDrawer,
    GfImage,
    GfSelectTable,
    GfSelectTableColumn,
    GfTable,
    GfInputNumber
];
// 这个js有待优化吧
export const gfComponent = function (Vue) {
    if (gfComponent.installed) return;
    components.map(component => Vue.component(component.name, component));
};
export const gfMath = math;
export const gfUtils = utils;

if (typeof window !== 'undefined' && window.Vue) {
    gfComponent(window.Vue);
}

export default {
    gfComponent,
    gfMath,
    gfUtils
};
