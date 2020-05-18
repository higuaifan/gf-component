<template>
    <div id="app">
        <link href="https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css" rel="stylesheet">
        <h1>
            组件库测试页面
        </h1>
        <div>
            <h1>建议下拉栏输入框</h1>
            <complete-page/>
        </div>
    </div>
</template>

<script>
    import CompletePage from "./pages/CompletePage";

    export default {
        name: 'app',
        components: { CompletePage }
    };
</script>

<style lang="scss">
    html, body {
        font-family: "PingFangSC-Regular", "Helvetica Neue", Arial, "Microsoft Yahei", Helvetica, sans-serif;
    }

    .drawer {
        display: inline-block;
        height: 500px;
        width: 1000px;
        background-color: #d4819a;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .drawer {
        font-size: 0;
    }

    .drawer-main {
        height: 100%;
        font-size: 18px;
    }

    .el-drawer__wrapper {
        position: relative !important;
        height: 100%;
        top: -100%;
    }

    .drawer-model {
        position: relative !important;
        top: -200% !important;
    }

    .v-modal-leave {
        display: none;
    }
</style>
