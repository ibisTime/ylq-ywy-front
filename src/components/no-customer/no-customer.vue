<template>
  <div class="head-wrapper" @click.stop>
    <img src="../../base/no-result/no-result@2x.png" alt=""><br>
    <span>暂无客户</span>
  </div>
</template>
<script>
  export default {
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .head-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-top: 2.54rem;
    text-align: center;
    img{
      width: 2.5rem;
      margin-bottom: 0.3rem;
    }
    span{
      font-size: 0.3rem;
      color: #484848;
    }
  }
</style>
