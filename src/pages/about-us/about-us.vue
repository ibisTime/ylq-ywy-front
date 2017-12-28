<template>
  <div class="home-wrapper">
    <scroll ref="scroll" class="about-content" :pullUpLoad="pullUpLoad">
      <div class="rich-text-description" ref="description">
        <div class="content" v-html="cvalue"></div>
      </div>
      <div class="service">
        <span>服务时间：{{serviceTime}}</span><br>
        <span>服务电话：<a :href="'tel:' +serviceTel">{{serviceTel}}</a></span>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {getUserSystemConfig, getServiceTime, getServiceTel} from 'api/general';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        cvalue: '',
        pullUpLoad: null,
        serviceTime: '',
        serviceTel: ''
      };
    },
    created() {
      this.first = true;
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/user/setting/about-us') {
          setTitle('关于我们');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          Promise.all([
            this.getUserSystemConfig('aboutUs'),
            getServiceTime('time'),
            getServiceTel('telephone')
          ]).then(([, r2, r3]) => {
            this.serviceTime = r2.cvalue;
            this.serviceTel = r3.cvalue;
            this.loadingFlag = false;
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      _refreshScroll() {
        setTimeout(() => {
          this.$refs.scroll.refresh();
          let imgs = this.$refs.description.getElementsByTagName('img');
          for (let i = 0; i < imgs.length; i++) {
            let _img = imgs[i];
            if (_img.complete) {
              setTimeout(() => {
                this.$refs.scroll.refresh();
              }, 20);
              continue;
            }
            _img.onload = () => {
              setTimeout(() => {
                this.$refs.scroll.refresh();
              }, 20);
            };
          }
        }, 20);
      },
      getUserSystemConfig(m) {
        getUserSystemConfig(m).then((data) => {
          this.cvalue = data.cvalue;
        });
      }
    },
    watch: {
      content() {
        this._refreshScroll();
      }
    },
    components: {
      Scroll
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .fr {
      float: right;
    }
    .about-content {
      height: 100%;
      background: $color-background;
    }
    .service {
      margin-top: 0.5rem;
      width: 100%;
      height: 1rem;
      text-align: left;
      padding: 0 0.3rem;
      font-size: $font-size-small;

      span {
        line-height: 0.5rem;
      }
      a {
        color: $color-text;
      }
    }
  }


</style>
