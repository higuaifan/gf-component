import Vue from 'vue'
import App from './App.vue'
import GfUI from '../index'
import ElementUI from 'element-ui';

Vue.use(GfUI);
Vue.use(ElementUI);

Vue.prototype.CONSTANT = {
    ICON: { test: { color: '#9BC0FE', title: '测试' } },
};
new Vue({
    el: '#app',
    render: h => h(App)
});


Vue.config.errorHandler = (err, vm, info) => {
    console.log('vue error handler');
    console.log(err, info);
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
};

window.onerror = (message, source, lineno, colno, error) => {
    console.log('window onerror');
    console.log(message);
};


window.addEventListener('error', (event) => {
    console.log('window addEventListener');
    console.log(event);
});
