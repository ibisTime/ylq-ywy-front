<template>
    <div class="full-screen-wrapper service-wrapper">
      <div class="top-cont">
        <div class="inner border-bottom-1px">
          <div class="imgs">
            <img src="./weixin.png"/>
            <img class="arrow" src="./arrow.png"/>
            <img src="./kefu.png">
          </div>
          <div class="desc">
            <div class="info">微信ID：{{wxID}}</div>
            <div class="info">加微信好友，和客服私聊哦^_^</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="qr-box" :style="getBg()"></div>
        <div class="text">或<span>微信扫一扫</span></div>
      </div>
    </div>
</template>
<script>
  import {getUserSystemConfig} from 'api/general';
  import {setTitle, formatImg} from 'common/js/util';

  export default {
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
    },
    methods: {
      getBg() {
        return {
          backgroundImage: `url(${formatImg(this.qrCode)})`
        };
      }
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
      @include border-bottom-1px($color-border);
      .imgs {
        padding-top: 0.85rem;
        font-size: 0;
        img {
          width: 1rem;
          vertical-align: middle;
          &.arrow {
            margin: 0 0.45rem;
          }
        }
      }
      .desc {
        padding-top: 0.16rem;
        padding-bottom: 0.94rem;
        font-size: $font-size-medium-x;
        .info {
          margin-top: 0.48rem;
          user-select: text;
        }
      }
    }
    .bottom {
      padding-top: 1rem;
      .qr-box {
        width: 3.1rem;
        height: 3.1rem;
        margin: 0 auto;
        box-shadow: 2px 2px 13px rgba(0,0,0,0.18);
        background-position: center;
        background-size: 86%;
        background-repeat: no-repeat;
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
