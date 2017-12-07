<template>
  <div class="home-wrapper">
    <div class='templet' @click="toChangeName(templetName)">
      <span class="type">模板名称</span>
      <img src="./more-gray@2x.png" alt="" class="fr">
      <span class="status fr">{{templetName}}</span>
    </div>
    <div class='templet'>
      <span class="type">使用的接口</span>
    </div>
      <div class="interfaces">
        <div class="interface" >
        <img src="./手机认证@2x.png" alt="" class="littleIcon">
        <span class="type">手机认证</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh">
        <span class="status fr">使用中</span>
      </div>
        <div class="interface">
        <img src="./芝麻认证@2x.png" alt="" class="littleIcon">
        <span class="type">芝麻认证</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh">
        <span class="status fr">使用中</span>

      </div>
        <div class="interface" >
        <img src="./基本信息@2x.png" alt="" class="littleIcon">
        <span class="type">基本信息</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh">
        <span class="status fr">使用中</span>
      </div>
        <div class="interface" v-model="item.status" @click="toInterfaceDetail(item.name,item.status)" v-for="item in interfaces">
        <img :src="item.src" alt="" class="littleIcon">
        <span class="type">{{item.text}}</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
        <span class="status fr" v-if="item.status">使用中</span>

    </div>
      </div>
    <div class="text">
      <span>目前报告价格为<span>25</span>元</span>
    </div>
    <div class="down">
      <button><span>发送客户</span></button>
    </div>
    <router-view @changeTemplet="changeTemplet" @changeName="changeName"></router-view>

  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import {setTitle} from 'common/js/util';

  export default {
    data () {
      return {
        interfaces: [
          {
            // 1.身份证正反面
            name: 'id',
            status: false,
            src: require('./身份证@2x.png'),
            text: '身份证正反面'
          }, {
            // 2.强制定位
            name: 'dingwei',
            status: false,
            src: require('./定位@2x.png'),
            text: '强制定位'
          }, {
            // 3.通讯录认证
            name: 'addressList',
            stats: false,
            src: require('./通讯录@2x.png'),
            text: '通讯录认证'
          }, {
            // 4.运营商认证
            name: 'provider',
            status: false,
            src: require('./运营商@2x.png'),
            text: '运营商认证'
          }, {
            // 5.芝麻信用认证
            name: 'zhimaxinyong',
            status: false,
            src: require('./芝麻分@2x.png'),
            text: '芝麻信用认证'
          }, {
            // 6.行业关注清单认证
            name: 'hangyeguanzhu',
            status: false,
            src: require('./行业关注名单@2x.png'),
            text: '行业关注清单认证'
          }, {
            // 7.欺诈三接口认证
            name: 'qizha',
            status: false,
            src: require('./欺诈认证@2x.png'),
            text: '欺诈三接口认证'
          }, {
            // 8.同盾认证
            name: 'tongdun',
            status: null,
            src: require('./同盾@2x.png'),
            text: '同盾认证'
          }
        ],
        // name用来接收接口详情返回的接口名称
        name: null,
        //  status用来接收接口详情返回的接口名称
        status: null,
        // 模板名称
        templetName: '模板1'
      };
    },
    created() {
      setTitle('模板详情');
    },
    methods: {
      toInterfaceDetail(n, m) {
        this.$router.push({name: 'interface-details', params: {name: n, status: m}});
      },
      toChangeName(name) {
        this.$router.push({name: 'change-templetname', params: {name: name}});
      },
      changeTemplet(n) {
        this.name = n.name || false;
        for (let v of this.interfaces) {
          if(v.name === this.name) {
            v.status = n.status || false;
          }
        }
      },
      changeName(n) {
        this.templetName = n.name;
      }
    },
    component: {
      Scroll
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
      .status{
        font-size: 0.24rem;
        color: #484848;
        margin-top: 0.05rem;
      }
      &:nth-child(2){
        height: 0.6rem;
        padding-top: 0.23rem;
        background: rgb(245,245,245);
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
