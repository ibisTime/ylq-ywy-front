<template>
    <div class="full-screen-wrapper setting-wrapper">
      <header>
        <div class="cd-flexbox cd-align-center">
          <div class="cd-avatar-box user-avatar"><img src="./avatar.png"></div>
          <div class="cd-flex1">
            <p>15555555555</p>
          </div>
        </div>
      </header>
      <div class="main-cont">
        <router-link tag="div" to="/user/setting/change-mobile" class="line-item border-bottom-1px">
          修改手机号<i class="right-arrow-gray"></i>
        </router-link>
        <router-link tag="div" to="/user/setting/change-pwd" class="line-item border-bottom-1px">
          修改登录密码<i class="right-arrow-gray"></i>
        </router-link>
        <div class="line-item border-bottom-1px">
          实名认证<i class="right-arrow-gray"></i>
        </div>
      </div>
      <div class="button-wrapper">
        <button>退出登录</button>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    created() {
      setTitle('设置');
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .setting-wrapper {
    background-color: $color-background;
    header {
      padding: 0.4rem 0.3rem;
      font-size: $font-size-medium-x;
      background-color: #fff;
      .user-avatar {
        width: 1rem;
        height: 1rem;
        flex: 0 0 1rem;
        margin-right: 0.2rem;
      }
    }
    .main-cont {
      margin-top: 0.2rem;
      padding-left: 0.3rem;
      font-size: $font-size-medium-x;
      background-color: #fff;
    }
    .line-item {
      padding-right: 0.3rem;
      line-height: 1rem;
      @include border-bottom-1px($color-border);
      &:last-child {
        @include border-none();
      }
    }
    .right-arrow-gray {
      float: right;
      height: 1rem;
      width: 0.16rem;
      @include bg-image('more-gray');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.16rem;
    }

    .button-wrapper {
      margin-top: 0.7rem;
      padding: 0 0.3rem;
      button {
        width: 100%;
        line-height: 0.88rem;
        border-radius: 0.1rem;
        font-size: $font-size-large-s;
        color: #fff;
        background-color: $primary-color;
      }
    }
  }
</style>
