<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">验证码</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="captcha" v-model="captcha" v-validate="'required|captcha'" placeholder="请输入验证码">
          <span v-show="errors.has('captcha')" class="error-tip">{{errors.first('captcha')}}</span>
        </div>
        <div class="item-btn border-left-1px">
          <button :disabled="sending" @click="sendCaptcha">{{captBtnText}}</button>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" name="pwd" v-model="pwd" v-validate="'required|min:6'" placeholder="密码不能少于6位">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwd')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">推荐人</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="userReferee" v-model="userReferee" v-validate="'required|mobile'" placeholder="请输入推荐人业务员的手机号">
          <span v-show="errors.has('userReferee')" class="error-tip">{{errors.first('userReferee')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="register">注册</button>
      </div>
      <toast ref="toast" text="注册成功"></toast>
      <full-loading v-show="loadFlag" title="注册中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {sendCaptcha} from 'api/general';
  import {register, login} from 'api/user';
  import {setTitle, setUser} from 'common/js/util';
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
        captBtnText: '获取验证码',
        mobile: '',
        pwd: '',
        userReferee: ''
      };
    },
    created() {
      setTitle('注册');
    },
    methods: {
      sendCaptcha() {
        this.$validator.validate('mobile').then((result) => {
          if (result) {
            this.sending = true;
            sendCaptcha(this.mobile, 805041).then(() => {
              this._setInterval();
            }).catch(() => {
              this._clearInterval();
            });
          }
        });
      },
      register() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            register(this.mobile, this.captcha, this.pwd, this.userReferee).then(() => {
              login(this.mobile, this.pwd).then((data) => {
                setUser(data);
                this.loadFlag = false;
                this.$refs.toast.show();
                setTimeout(() => {
                  this.$router.push('/home');
                }, 500);
              }).catch(() => {
                this.loadFlag = false;
                this.$refs.toast.show();
                setTimeout(() => {
                  this.$router.push('/login');
                }, 500);
              });
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
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
