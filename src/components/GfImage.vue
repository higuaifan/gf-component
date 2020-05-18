<template>
  <el-image :src="''" :fit="'contain'">
    <div slot="error" class="error-image">
      <span>暂无图片</span>
    </div>
  </el-image>
</template>

<script>
  /**
   * @description
   * @author: 菩萨蛮
   * @date 2019/11/28 2:17 下午
   * @version V1.0.0
   *
   * 公司的业务千篇一律，复杂的代码好几百行
   */

  export default {
    name: 'GfImage',
    props: {
      fit: {
        type: String, default: 'contain'
      },
      src: String
    }
  };
</script>

<style lang="scss" scoped>

</style>
