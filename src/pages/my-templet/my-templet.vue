<template>
  <div class="home-wrapper">
    <div class='templet' @click="$router.push({name:urlName,params:{changeFlag:false}})" v-for='item in templets'>
      <span class="type">{{item.name}}</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
      <span class="fr price">{{item.price}}元</span>

    </div>
    <div class="down" @click="$router.push({name:urlName,params:{changeFlag:true}})">
      <button><span>创建模板</span></button>
    </div>
    <router-view></router-view>

  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    data() {
      return {
        urlName: 'templet-details',
        templets: [{
          name: '基础模板',
          price: 345
        }, {
          name: '小贷模板',
          price: 456
        }, {
          name: '我的模板',
          price: 128
        }]
      };
    },
    created() {
      setTitle('资信报告');
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
        margin-bottom: 0.2rem;
      }
      &:nth-child(3){
        margin-bottom: 0.8rem;
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
