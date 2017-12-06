<template>
  <div class="home-wrapper">
    <div class="content">

    </div>
    <div class="buttons">
      <button class="start">启用</button>
      <button class="stop">停用</button>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    created() {
      setTitle('接口详情');
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .fr{
      float: right;
    }
    .content{
       width: 100%;
       height: 6rem;
       background: skyblue;
       padding: 0.3rem;
     }
    .buttons{
      width: 100%;
      height: 1.3rem;
      position: fixed;
      bottom: 0;
      padding:0.2rem 0.3rem;

      button{
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        border-radius: 0.1rem;
        width: 3.3rem;
        height: 0.9rem;
        font-size: 0.36rem;
        color: #fff;
      }
      .start{
        background: $primary-color;
        margin-right: 0.2rem;
      }
      .stop{
        background: #ffae00;
      }
    }
  }


</style>
