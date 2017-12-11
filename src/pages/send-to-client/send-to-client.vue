<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" v-model="mobile" @change="_mobileValid" placeholder="请输入您要发送的手机号">
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

      <div class="form-btn">
        <button @click="sendToCilent">发送</button>
      </div>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
    <toast ref="toast" text="发送成功!"></toast>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import {SET_USER_MOBILE} from 'store/mutation-types';
  import {sendCaptcha} from 'api/general';
  import {mobileValid, captValid, setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {sendToClient} from 'api/biz';

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
        modelCode: ''
      };
    },
    created() {
      setTitle('修改手机号');
//      console.log(this.$route.params.code);
      this.modelCode = this.$route.query.code;
    },
    methods: {
      sendCaptcha() {
        if (this._mobileValid()) {
          this.sending = true;
          sendCaptcha(this.mobile, 805250).then(() => {
            this._setInterval();
          }).catch(() => {
            this._clearInterval();
          });
        }
      },
      sendToCilent() {
        if (this._valid()) {
          sendToClient(this.captcha, this.mobile, this.modelCode).then((data) => {
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.back();
            }, 500);
          });
        }
      },
      _valid() {
        let r1 = this._mobileValid();
        let r2 = this._captValid();
        return r1 && r2;
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
      },
      ...mapMutations({
        setUserMobile: SET_USER_MOBILE
      })
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
