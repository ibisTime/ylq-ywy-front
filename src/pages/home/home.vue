<template>
    <div class="full-screen-wrapper home-wrapper">
      <scroll ref="scroll" :pullUpLoad="pullUpLoad">
        <div class="banner">
          <slider v-if="banners.length" :loop="loop" :showDots="showDots" id="slider">
            <div class="home-slider" v-for="item in banners" :key="item.code">
              <a :href="item.url||'javascript:void(0)'" :style="getImgSyl(item.pic)"></a>
            </div>
          </slider>
        </div>
        <div class="middle">
          <router-link tag="div" to="/my-templet/templet-details?moren=1" class="fl sendReport">
            <span>发起调查</span>
            <img src="./发送报告@2x.png" class="fr">
          </router-link>
          <router-link tag="div" to="/customers" class="fl myClient">
            <span>我的客户</span>
            <img src="./我的客户@2x.png" class="fr">
          </router-link>
          <router-link tag="div" to="/user" class="personalCenter fl">
            <span>个人中心</span>
            <img src="./个人中心@2x.png" class="fr">
          </router-link>
        </div>
        <div class="blank"></div>
        <div class="smallIcons">
          <div v-for="item in items1" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items2" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items3" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src"><br>
            <span>{{item.text}}</span>
          </div>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>
<script>
  import slider from 'base/slider/slider';
  import {formatImg, setTitle} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  import {getBannerList} from 'api/general';
  export default {
    data() {
      return {
        banners: [],
        items1: [{
          text: '资信模板',
          src: require('./资信报告@2x.png'),
          to: '/my-templet'
        }, {
          text: '资信跟踪',
          src: require('./信息跟踪@2x.png'),
          to: '/home/contact-business'

        }, {
          text: '资信联动',
          src: require('./资信联动@2x.png'),
          to: '/home/contact-business'
        }],
        items2: [{
          text: '资金代收',
          src: require('./资金代收@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '资金代付',
          src: require('./资金代付@2x.png'),
          to: '/home/contact-business'
        }, {
          text: '资金账本',
          src: require('./资金账本@2x.png'),
          to: '/home/contact-business'
        }],
        items3: [{
          text: '我的申请',
          src: require('./合同@2x.png'),
          to: '/home/my-apply'
        }, {
          text: '转赠处理',
          src: require('./存管@2x.png'),
          to: '/home/orders'
        }, {
          text: 'APP下载',
          src: require('./more@2x.png'),
          to: '/home/qrcode'
        }],
        pullUpLoad: null
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      });
    },
    created() {
      this.first = true;
      setTitle('首页');
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    computed: {
      showDots() {
        return this.banners.length > 1;
      },
      loop() {
        return this.banners.length > 1;
      }
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/home') {
          setTitle('首页');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          this.getBanners().then(() => {
            this.loadingFlag = false;
            setTimeout(() => {
              this.$refs.scroll.refresh();
            }, 20);
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      getImgSyl(imgs) {
        return {
          backgroundImage: `url('${formatImg(imgs)}')`
        };
      },
      getBanners() {
        return getBannerList('index_banner').then((data) => {
          this.banners = data;
        });
      }
    },
    components: {
      slider,
      Scroll
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .banner {
      position: relative;
      height: 3.5rem;
      .home-slider {
        a {
          width: 100%;
          height: 3.5rem;
          background-size:cover;
        }
      }
    }
    .middle {
      width: 100%;
      height: 2.76rem;
      background: #fff;
      .sendReport {
        width: 50%;
        height: 100%;
        display: inline-block;
        padding-top:0.55rem;
        padding-right: 0.36rem;
        padding-left: 0.55rem;
        border-right: $color-border 1px solid;
        span {
          font-size: $font-size-large-s;
          color: #0cb8ae;
        }
        img {
          width: 2.12rem;
          height: 1.71rem;
        }
      }
      .myClient, .personalCenter{
        width: 50%;
        height: 50%;
        padding-left: 0.38rem;
        padding-right: 0.52rem;
        span{
          display: inline-block;
          font-size: $font-size-medium-xx;
          padding-top: 0.53rem;
        }
        img{
          height: 1.08rem;
          padding-top: 0.15rem;
        }
      }
      .myClient {
        border-bottom: $color-border 0.01rem solid;
        img {
          width: 1.2rem;
        }
      }
      .personalCenter {
        img {
          width: 1.28rem;
        }
      }
    }
    .blank {
      width: 100%;
      height: 0.2rem;
      background: $color-background;
    }
    .smallIcons {
      width: 100%;
      height: 5.7rem;
      background: #fff;
      div {
        border-bottom: 0.01rem solid $color-border;
      }
      .item {
        width: 33.3%;
        height: 1.9rem;
        padding-top: 0.48rem;
        text-align: center;
        img {
          margin-bottom: 0.24rem;
          width: 0.46rem;
          height: 0.46rem;
        }
        span {
          font-size: $font-size-medium;
          color: #666;
          margin: 0 auto;
        }
      }
    }
  }
</style>
