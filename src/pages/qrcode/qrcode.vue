<template>
  <div class="full-screen-wrapper qrcode-wrapper">
    <div class="qrcode-box">
      <div class="inner-box">
        <img src="./qrcode.png" alt="app下载二维码">
      </div>
      <div class="note">
        <span>被调查人APP</span>
      </div>
    </div>
    <div class="down-tip cd-flexbox cd-align-center cd-justify-center">
      <i></i><span>下载说明</span><i></i>
    </div>
    <div class="content">
      <p>将<label>二维码</label>保存至手机相册;</p>
      <p>打开<label>微信</label>，选择<label>相册</label>中的二维码图片,</p>
      <p><label>扫一扫</label>后进入下载页面;</p>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  export default {
    create() {
      setTitle('APP下载');
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .qrcode-wrapper {
    background-color: $primary-color;
    background-size: cover;
    background-position: center;
    @include bg-image('bg');
    .qrcode-box {
      width: 5.82rem;
      height: 6.6rem;
      margin: 0.64rem auto;
      padding-top: 1.5rem;
      background-size: 100% 100%;
      @include bg-image('box');
      .inner-box {
        width: 3.8rem;
        height: 3.8rem;
        margin: 0 auto;
        padding: 0.25rem;
        @include bg-image('border');
        background-size: 100% 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .note {
        margin: 0 auto;
        text-align: center;
        padding-top:0.25rem;
        span {
          font-size: $font-size-medium-x;
          color: red;
        }
      }
    }
    .down-tip {
      margin-top: 0.12rem;
      font-size: $font-size-medium-xx;
      color: #fff;
      i {
        display: inline-block;
        width: 0.86rem;
        height: 1px;
        background-color: #fff;
      }
      span {
        padding: 0 0.16rem;
      }
    }
    .content {
      padding-top: 0.43rem;
      line-height: 0.56rem;
      text-align: center;
      font-size: $font-size-medium-x;
      color: #fff;
      label {
        color: #fff100;
      }
    }
  }
</style>
