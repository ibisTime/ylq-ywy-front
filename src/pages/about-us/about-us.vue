<template>
  <div class="home-wrapper">
    <scroll ref="scroll" class="about-content">
      <div class="rich-text-description" ref="description">
        <div class="content" v-html="cvalue"></div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {getUserSystemConfig} from 'api/general';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        cvalue: ''
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
            this.getUserSystemConfig('aboutUs')
          ]).then(() => {
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
    .about-content{
      height: 100%;
      background: $color-background;
      .rich-text-description{
        height: 100%;
        padding: 0;
        margin: 0;
        .content{
          width: 100%;
          padding: 0.3rem;
        }
      }
    }
  }


</style>
