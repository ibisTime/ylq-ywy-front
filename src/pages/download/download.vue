<template>
  <div class="full-screen-wrapper download-wrapper">
    <div class="cloud"></div>
    <div class="sun"></div>
    <div class="box-wrap"><img src="./logo.png" alt="logo"></div>
    <div class="title"><div class="name">资信中心<i></i></div></div>
    <div v-if="showBtn" class="buttons">
      <template v-if="androidUrl">
        <a v-if="!isIOS" class="button" :href="androidUrl">
          <i class="icon icon-android"></i>Android版下载
        </a>
        <div v-else class="button" @click="handleAndroidClick">
          <i class="icon icon-android"></i>Android版下载
        </div>
      </template>
      <template v-if="iosUrl">
        <a v-if="isIOS" class="button" :href="iosUrl">
          <i class="icon icon-ios"></i>iPhone版下载
        </a>
        <div v-else class="button" @click="handleIosClick">
          <i class="icon icon-ios"></i>iPhone版下载
        </div>
      </template>
    </div>
    <full-loading v-show="loadFlag"></full-loading>
    <toast ref="toast" :text="toastTxt"></toast>
  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {getUserSystemConfig} from 'api/general';
  import {setTitle, deviceIsIOS} from 'common/js/util';

  export default {
    data() {
      return {
        loadFlag: true,
        iosUrl: '',
        androidUrl: '',
        isIOS: deviceIsIOS,
        toastTxt: ''
      };
    },
    computed: {
      showBtn() {
        return this.iosUrl || this.androidUrl || this.loadFlag;
      }
    },
    created() {
      setTitle('APP下载');
      Promise.all([
        getUserSystemConfig('ios'),
        getUserSystemConfig('android')
      ]).then(([ios, android]) => {
        this.loadFlag = false;
        this.iosUrl = ios.cvalue;
        this.androidUrl = android.cvalue;
      }).then(() => {
        this.loadFlag = false;
      });
    },
    methods: {
      handleIosClick() {
        this.showMsg('该链接仅针对iPhone下载');
      },
      handleAndroidClick() {
        this.showMsg('该链接仅针对Android下载');
      },
      showMsg(msg) {
        this.toastTxt = msg;
        this.$refs.toast.show();
      }
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .download-wrapper {
    background-color: $primary-color;
    background-size: cover;
    background-position: center;
    @include bg-image('bg');
    .cloud {
      position: absolute;
      top: 1.36rem;
      left: 0.92rem;
      width: 0.98rem;
      height: 0.35rem;
      background-size: 100%;
      @include bg-image('cloud');
    }
    .sun {
      position: absolute;
      top: 0;
      right: 0;
      width: 2.72rem;
      height: 1.91rem;
      background-size: 100%;
      @include bg-image('sun');
    }
    .box-wrap {
      width: 2.58rem;
      height: 2.58rem;
      margin: 1.46rem auto 0.54rem;
      padding: 0.28rem;
      background-size: 100% 100%;
      @include bg-image('border');
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      text-align: center;
      .name {
        position: relative;
        display: inline-block;
        font-size: $font-size-large-xx;
        color: #fff;
        i {
          position: absolute;
          right: -0.9rem;
          top: 0;
          display: inline-block;
          width: 0.72rem;
          height: 0.58rem;
          background-size: 100%;
          @include bg-image('star');
        }
      }
    }
    .buttons {
      width: 5.4rem;
      margin: 1.3rem auto 0;
      .button {
        display: block;
        height: 1.06rem;
        line-height: 1.06rem;
        border-radius: 0.1rem;
        font-size: 0.41rem;
        background: #fff;
        color: $primary-color;
        text-align: center;
        .icon {
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.4rem;
          width: 0.43rem;
          height: 0.5rem;
          background-size: 100%;
          &.icon-android {
            @include bg-image('android');
          }
          &.icon-ios {
            @include bg-image('apple');
          }
        }
        &+.button {
          margin-top: 0.5rem;
        }
      }
    }
  }
</style>
