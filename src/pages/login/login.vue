<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" v-model="mobile" @change="mobileValid" placeholder="请输入手机号">
          <span v-show="mobErr" class="error-tip">{{mobErr}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="pwd" @change="pwdValid" placeholder="请输入密码">
          <span v-show="pwdErr" class="error-tip">{{pwdErr}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="login">登录</button>
      </div>
      <div class="other-info">
        <router-link to="/register">立即注册</router-link>
        <router-link to="/find-pwd">找回密码</router-link>
      </div>
    </div>
    <full-loading v-show="loadFlag" title="登录中..."></full-loading>
  </div>
</template>
<script>
  import {login} from 'api/user';
  import {mobileValid, emptyValid, setTitle, setUser} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        mobile: '',
        mobErr: '',
        pwd: '',
        pwdErr: ''
      };
    },
    created() {
      setTitle('登录');
    },
    methods: {
      login() {
        if (this.valid()) {
          this.loadFlag = true;
          login(this.mobile, this.pwd)
            .then((data) => {
              setUser(data);
              this.loadFlag = false;
              this.$router.replace('/home');
            }).catch(() => {
              this.loadFlag = false;
            });
        }
      },
      valid() {
        let r1 = this.mobileValid();
        let r2 = this.pwdValid();
        return r1 && r2;
      },
      pwdValid() {
        let result = emptyValid(this.pwd);
        this.pwdErr = result.msg;
        return !result.err;
      },
      mobileValid() {
        let result = mobileValid(this.newPwd);
        this.mobErr = result.msg;
        return !result.err;
      }
    },
    components: {
      FullLoading
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .change-mobile-wrapper {
    background-color: $color-background;
    .other-info {
      margin-top: 0.4rem;
      padding: 0 0.3rem;
      a {
        font-size: $font-size-medium-s;
        color: #fbab46;
        float: left;
        &+a {
          float: right;
        }
      }
    }
  }
</style>
