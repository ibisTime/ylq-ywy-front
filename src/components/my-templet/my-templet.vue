<template>
  <div class="home-wrapper">
    <div class='templet' @click="$router.push(`/templet-details`)">
      <span class="type">基础模板</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
      <span class="fr price">345元</span>

    </div>
    <div class='templet'>
      <span class="type">小贷模板</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
      <span class="fr price">456元</span>
    </div>
    <div class='templet'>
      <span class="type">我的模板</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
      <span class="fr price">128元</span>
    </div>
    <div id="down">
      <button><span>创建模板</span></button>
    </div>

  </div>
</template>
<script>
  export default {

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
    div{
      background: #fff;
    };
    .templet{
      width: 100%;
      height: 1rem;
      padding: 0.35rem 0.3rem;
      border-bottom:0.01rem solid #eee;
      .type{
        font-size: 0.3rem;
        color: #484848;
      }
      .price{
        font-size: 0.28rem;
        color: $primary-color;
      }
      img{
        width: 0.25rem;
        height: 0.28rem;
        margin-left: 0.2rem;
      }
    }
    .templet:nth-child(2){
      margin-bottom: 0.2rem;
    }
    .templet:nth-child(3){
      margin-bottom: 0.8rem;
    }
    #down{
      padding:0 0.3rem;
      background: transparent;
      button{
        width: 100%;
        height: 0.9rem;
        background: $primary-color;
        border-radius: 0.1rem ;
        span{
          color:#fff;
          font-size: 0.36rem;
        }
      }
    }

  }


</style>
