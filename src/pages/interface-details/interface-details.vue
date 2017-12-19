<template>
  <div class="full-screen-wrapper interface-detail-wrapper">
    <scroll ref="scroll" :hasMore="loadingFlag" class="about-content">
      <div class="rich-text-description" ref="description">
        <div class="content" v-html="description"></div>
      </div>
    </scroll>
    <div class="buttons">
      <button class="start color1" @click="changeStatus(true)" >启用</button>
      <button class="stop color2" @click="changeStatus(false)" >停用</button>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {queryInterface} from 'api/biz';
  import Scroll from 'base/scroll/scroll';

  export default {
    data() {
      return {
        loadingFlag: true,
        name: null,
        status: null,
        description: '',
        price: ''
      };
    },
    created() {
      setTitle('接口详情');
      // 将数据放在当前组件的数据内
      this.code = this.$route.query.code;
      this.status = this.$route.query.status === 'true';
      queryInterface(this.code).then((data) => {
        this.loadingFlag = false;
        this.description = data.description;
        this.price = data.price;
      });
    },
    methods: {
      changeStatus(status) {
        if ((this.status && !status) || (!this.status && status)) {       // 进来的时候是使用中，点击了停用
          this.$router.back();
          if (status) {
            // 如果是点了启用，就传正数的价格
            this.$emit('changeTemplet', {code: this.code, status: status, price: this.price});
          } else {
            this.$emit('changeTemplet', {code: this.code, status: status, price: -(this.price)});
          }
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

  .interface-detail-wrapper {
    background-color: $color-background;
    .fr {
      float: right;
    }
    .color1 {
      background: $primary-color;
    }
    .color2 {
      background: #ffae00;
    }
    .buttons {
      width: 100%;
      height: 1.3rem;
      position: fixed;
      bottom: 0;
      padding:0.2rem;
      background: #fff;
      button {
        border-radius: 0.1rem;
        width: 48%;
        height: 0.9rem;
        font-size: 0.36rem;
        color: #fff;
      }
      .start {
        margin-right: 2%;
      }
    }
    .about-content{
      height: 90%;
      .rich-text-description{
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
