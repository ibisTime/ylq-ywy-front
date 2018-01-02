<template>
  <div class="head-wrapper" @click.stop>
    <img src="./联系商务@2x.png" alt="">
    <div class="tips">
      <p>此功能暂不对您开放</p>
      <p>如有需要请联系商务人员</p>
      <p>姓名：宓永宝</p>
      <p>手机：<a href="tel://13958092437">13958092437</a></p>
    </div>

  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  export default {
    create () {
      setTitle('联系商务');
    }
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
    padding-top: 2.45rem;
    text-align: center;
    img {
      margin-bottom: 0.46rem;
      width: 2.5rem;
    }
    .tips {
      p:first-child {
        font-size: 0.34rem;
        color: $primary-color;
      }
      p {
        font-size: 0.28rem;
        color: #484848;
        margin-bottom: 0.28rem;
      }
    }
    a {
      color: $color-text;
    }
  }
</style>
