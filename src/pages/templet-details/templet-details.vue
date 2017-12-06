<template>
  <div class="home-wrapper">
    <div class='templet'>
      <span class="type">模板名称</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
    </div>
    <div class='templet'>
      <span class="type">使用的接口</span>
    </div>
    <div class="interfaces">
      <div class="interface" >
        <img src="./基本信息@2x.png" alt="" class="littleIcon">
        <span class="type">基本信息</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh">
        <span class="status fr">使用中</span>
      </div>
      <div class="interface">
        <img src="./芝麻认证@2x.png" alt="" class="littleIcon">
        <span class="type">芝麻认证</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh">
        <span class="status fr">使用中</span>

      </div>
      <div class="interface" @click="$router.push(`/interface-details`)
">
        <img src="./芝麻分@2x.png" alt="" class="littleIcon">
        <span class="type">芝麻分</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
      </div>
      <div class="interface">
        <img src="./行业关注名单@2x.png" alt="" class="littleIcon">
        <span class="type">行业关注名单</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
      </div>
      <div class="interface">
        <img src="./运营商@2x.png" alt="" class="littleIcon">
        <span class="type">运营商</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
      </div>
      <div class="interface">
        <img src="./同业数据@2x.png" alt="" class="littleIcon">
        <span class="type">同业数据</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
      </div>
    </div>
    <div class="text">
      <span>目前报告价格为<span>25</span>元</span>
    </div>
    <div class="down">
      <button><span>发送客户</span></button>
    </div>

  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    created() {
      setTitle('模板详情');
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
    .vh{
      visibility: hidden;
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
        width: 0.15rem;
        margin-left: 0.2rem;
      }
      &:nth-child(2){
        height: 0.6rem;
        padding-top: 0.23rem;
        background: transparent;
        .type{
          font-size: 0.24rem;
          color: #999;
        }
      }
    }

    .interfaces{
      margin-bottom: 0.6rem;
      .interface{
        padding:0.35rem 0.3rem 0.35rem 0.4rem;
        border-bottom:0.01rem solid #eee;
        .littleIcon{
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.2rem;
          margin-left:0;
          margin-top: 0.05rem;
        }
        .type{
          font-size: 0.3rem;
          color: #484848;
        }
        img{
          width: 0.15rem;
          margin-left: 0.26rem;
          margin-top: 0.03rem;
        }
        .status{
          font-size: 0.24rem;
          color: #484848;
          margin-top: 0.05rem;
        }
      }
    }
.text{
  text-align: center;
  margin-bottom: 1.4rem;
  background: transparent;
  span{
    color: #484848;
    font-size: 0.28rem;
    span{
      color: $primary-color;
      font-size: 0.36rem;
    }
  }
}
    .down{
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
