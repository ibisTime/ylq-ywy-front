<template>
    <div class="home-wrapper">
      <scroll ref="scroll">
        <div id="banner">
          <slider v-if="banners.length" :loop="loop" id="slider">
            <div class="home-slider" v-for="item in banners" :key="item.code">
              <a :href="item.url||'javascript:void(0)'" :style="getImgSyl(item.pic)"></a>
            </div>
          </slider>
        </div>
        <div id="middle">
          <!--<div id="sendReport" class="fl" @click="$router.push({name:'templet-details',params:{changeFlag:false,moren:true}})">-->
          <div id="sendReport" class="fl" @click="$router.push('/my-templet/templet-details?changeFlag='+false+'&moren='+true)">
            <span>发送报告</span>
            <img src="./发送报告@2x.png" alt="" class="fr">
          </div>
          <div id="myClient" class="fl" @click="$router.push(`/customers`);
">
            <span>我的客户</span>
            <img src="./我的客户@2x.png" alt="" class="fr">
          </div>
          <div id="personalCenter" class="fl" @click="$router.push(`/user`);
">
            <span>个人中心</span>
            <img src="./个人中心@2x.png" alt="" class="fr">
          </div>
        </div>
        <div id="blank"></div>
        <div id="smallIcons">
          <div v-for="item in items1" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src" alt=""><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items2" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src" alt=""><br>
            <span>{{item.text}}</span>
          </div>
          <div v-for="item in items3" class="fl item" @click="$router.push(item.to);">
            <img v-bind:src="item.src" alt=""><br>
            <span>{{item.text}}</span>
          </div>
        </div>
      </scroll>

    </div>
</template>
<script>
  import slider from 'base/slider/slider';
//  import {formatImg} from 'common/js/util';
  import {setTitle} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        banners: [{
          pic: require('./banner@2x.png')
        }, {
          pic: require('./banner@2x.png')
        }, {
          pic: require('./banner@2x.png')
        }],
        items1: [{
          text: '资信报告',
          src: require('./资信报告@2x.png'),
          to: '/my-templet'
        }, {
          text: '资信跟踪',
          src: require('./信息跟踪@2x.png'),
          to: '/contact-business'

        }, {
          text: '资信联动',
          src: require('./资信联动@2x.png'),
          to: '/contact-business'
        }],
        items2: [{
          text: '资金代收',
          src: require('./资金代收@2x.png'),
          to: '/contact-business'
        }, {
          text: '资金代付',
          src: require('./资金代付@2x.png'),
          to: '/contact-business'
        }, {
          text: '资金账本',
          src: require('./资金账本@2x.png'),
          to: '/contact-business'
        }],
        items3: [{
          text: '补合同',
          src: require('./合同@2x.png'),
          to: '/contact-business'
        }, {
          text: '合同存管',
          src: require('./存管@2x.png'),
          to: '/contact-business'
        }, {
          text: '更多',
          src: require('./more@2x.png'),
          to: '/contact-business'
        }]
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
      setTitle('首页');
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
      getImgSyl(imgs) {
        return {
//          backgroundImage: `url(${formatImg(imgs)})`
          backgroundImage: `url(${imgs})`
        };
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
*{
  margin: 0;
  padding: 0;
}
  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .fl{
      float: left;
    }
    .fr{
      float: right;
    }
    #banner{
      position: relative;
      .home-slider{
        a{
          width: 100%;
          height: 3.5rem;
          background-size:cover;
        }

      }
    }
    #middle{
      width: 100%;
      height: 2.76rem;
      background: #fff;
      #sendReport{
        width: 50%;
        height: 100%;
        /*background: green;*/
        display: inline-block;
        padding-top:0.55rem;
        padding-right: 0.36rem;
        padding-left: 0.55rem;
        border-right:#eee 1px solid;
        span{
          font-size: 0.36rem;
          color: #0cb8ae;
        }
        img{
          width: 2.12rem;
          height: 1.71rem;
        }
      }

      #myClient,#personalCenter{
        width: 50%;
        height: 50%;
        padding-left: 0.38rem;
        padding-right: 0.52rem;
        span{
          display: inline-block;
          font-size: 0.32rem;
          color: #484848;
          padding-top: 0.53rem;
        }
        img{
          height: 1.08rem;
          padding-top: 0.15rem;
        }
      }
      #myClient{
        border-bottom:#eee 0.01rem solid;
        img{
          width: 1.2rem;
        }
      }
      #personalCenter{
        img{
          width: 1.28rem;
        }
      }

    }

    #blank{
      width: 100%;
      height: 0.2rem;
      background: #f5f5f5;
    }
    #smallIcons {
      width: 100%;
      height: 5.7rem;
      background: #fff;
      div{
        border-bottom:0.01rem solid #eee;
      }
      .item {
        width: 33.3%;
        height: 1.9rem;
        padding-top: 0.48rem;
        text-align: center;
        img{
          margin-bottom: 0.24rem;
          width: 0.46rem;
          height: 0.46rem;
        }
        span{
          font-size: 0.28rem;
          color: #666;
          margin:0 auto;
        }
      }
    }

  }


</style>
