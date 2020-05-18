<template>
  <el-table :data="data.concat({isNew:true})" style="width: 100%">
    <slot></slot>
  </el-table>
</template>

<script>
  /**
   * @description 选择商品用的table
   * @author: 菩萨蛮
   * @date 2019/11/13 5:47 下午
   * @version V1.0.0
   *
   * 公司的业务千篇一律，复杂的代码好几百行
   */


  export default {
    name: 'GfSelectTable',
    props: {
      data: { type: Array, default: () => [] }
    },
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>

</style>
