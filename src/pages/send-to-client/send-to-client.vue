<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入客户的手机号">
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

      <div class="form-btn">
        <button @click="sendCilent">发送</button>
      </div>
      <full-loading v-show="loadFlag" title="发送中..."></full-loading>
    </div>
    <toast ref="toast" text="发送成功!"></toast>
    <confirm ref="confirm" text="确定发送报告吗？" @confirm="sendToClient"></confirm>
  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import Confirm from 'base/confirm/confirm';
  import {sendCaptcha} from 'api/general';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';

  import {sendToClient} from 'api/biz';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: false,
        captcha: '',
        captBtnText: '获取验证码',
        mobile: '',
        modelCode: ''
      };
    },
    created() {
      setTitle('发送客户');
      this.modelCode = this.$route.query.code;
    },
    methods: {
      sendCaptcha() {
        this.$validator.validate('mobile').then((result) => {
          if (result) {
            this.sending = true;
            sendCaptcha(this.mobile, 805250).then(() => {
              this._setInterval();
            }).catch(() => {
              this._clearInterval();
            });
          }
        });
      },
      sendCilent() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$refs.confirm.show();
          }
        });
      },
      sendToClient() {
        this.loadFlag = true;
        sendToClient(this.captcha, this.mobile, this.modelCode).then(() => {
          this.loadFlag = false;
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.back();
          }, 500);
        }).catch(() => {
          this.loadFlag = false;
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
      FullLoading,
      Confirm
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .change-mobile-wrapper {
    background-color: $color-background;
  }
</style>
