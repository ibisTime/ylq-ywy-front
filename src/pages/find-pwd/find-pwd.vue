<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" v-model="mobile" @change="_mobileValid" placeholder="请输入手机号">
          <span v-show="mobErr" class="error-tip">{{mobErr}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">验证码</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" v-model="captcha" @change="_captValid" placeholder="请输入验证码">
          <span v-show="captErr" class="error-tip">{{captErr}}</span>
        </div>
        <div class="item-btn border-left-1px">
          <button :disabled="sending" @click="sendCaptcha">{{captBtnText}}</button>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">新密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="pwd" @change="_pwdValid" placeholder="新密码不能少于6位">
          <span v-show="pwdErr" class="error-tip">{{pwdErr}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="resetPwd">重置</button>
      </div>
      <toast ref="toast" text="密码重置成功"></toast>
      <full-loading v-show="loadFlag" title="重置中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {sendCaptcha} from 'api/general';
  import {resetPwd} from 'api/user';
  import {mobileValid, captValid, pwdValid, setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: false,
        captcha: '',
        captErr: '',
        captBtnText: '获取验证码',
        mobile: '',
        mobErr: '',
        pwd: '',
        pwdErr: ''
      };
    },
    created() {
      setTitle('找回密码');
    },
    methods: {
      sendCaptcha() {
        if (this._mobileValid()) {
          this.sending = true;
          sendCaptcha(this.mobile, 805063).then(() => {
            this._setInterval();
          }).catch(() => {
            this._clearInterval();
          });
        }
      },
      resetPwd() {
        if (this._valid()) {
          this.loadFlag = true;
          resetPwd(this.mobile, this.captcha, this.pwd)
            .then(() => {
              this.loadFlag = false;
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('/login');
              }, 500);
            }).catch(() => {
              this.loadFlag = false;
            });
        }
      },
      _valid() {
        let r1 = this._mobileValid();
        let r2 = this._captValid();
        let r3 = this._pwdValid();
        return r1 && r2 && r3;
      },
      _mobileValid() {
        let result = mobileValid(this.mobile);
        this.mobErr = result.msg;
        return !result.err;
      },
      _captValid() {
        let result = captValid(this.captcha);
        this.captErr = result.msg;
        return !result.err;
      },
      _pwdValid() {
        let result = pwdValid(this.pwd);
        this.pwdErr = result.msg;
        return !result.err;
      },
      _setInterval() {
        let i = 60;
        this.timer = setInterval(() => {
          if (i === 0) {
            this._clearInterval();
          } else {
            this.captBtnText = i-- + 's';
          }
        }, 1000);
      },
      _clearInterval() {
        if (this.timer) {
          clearInterval(this.timer);
          this.sending = false;
          this.captBtnText = '获取验证码';
        }
      }
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .change-mobile-wrapper {
    background-color: $color-background;
  }
</style>
