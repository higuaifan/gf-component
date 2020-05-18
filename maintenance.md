# gf-component

## 更新样式库

1. 将需要编译的样式复制到`element-variables.scss`中;
2. 在**终端**中输入`et -m`;
3. 等待编译完成后获得新的样式库;
4. 在相关组件页面中通过自测;


## 更新组件库

1. 编写组件并放置在`/src/components/template/`文件夹下;
2. 在`App.vue`中通过自测;
3. 修改`package.json`中的版本号;
4. 在**终端**里`npm login`登陆千讯科技的npm账号;
5. 然后输入`npm publish`或运行`package.json`中的`publish`命令;
6. 发布成功;
