<template>
    <div class="full-screen-wrapper service-wrapper">
      <div class="top-cont">
        <div class="inner">
          <div class="imgs">
            <img src="./weixin.png"/>
            <img class="arrow" src="./arrow.png"/>
            <img src="./kefu.png">
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="qr-box"><img :src="this.qrCode | formatImg"></div>
        <div class="text">长按识别二维码</span></div>
      </div>
    </div>
</template>
<script>
  import {getUserSystemConfig} from 'api/general';
  import {setTitle} from 'common/js/util';
  import {commonMixin} from 'common/js/mixin';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        wxID: '',
        qrCode: ''
      };
    },
    created() {
      setTitle('客服');
    },
    mounted() {
      getUserSystemConfig('weixinID').then((data) => {
        let cvalue = JSON.parse(data.cvalue);
        this.wxID = cvalue.id;
        this.qrCode = cvalue.pic;
      });
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .service-wrapper {
    background-color: #fff;
    text-align: center;
    .top-cont {
      padding: 0 0.3rem;
      .imgs {
        padding-top: 1.85rem;
        font-size: 0;
        img {
          width: 1rem;
          vertical-align: middle;
          &.arrow {
            margin: 0 0.45rem;
          }
        }
      }
    }
    .bottom {
      padding-top: 1rem;
      .qr-box {
        width: 3.1rem;
        height: 3.1rem;
        margin: 0 auto;
        padding: 0.12rem;
        box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.18);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin-top: 0.68rem;
        font-size: $font-size-medium-x;
        span {
          color: $primary-color;
        }
      }
    }
  }
</style>
