<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入新手机号">
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
        <button @click="_changeMobile">保存</button>
      </div>
      <toast ref="toast" text="修改成功"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import {SET_USER_MOBILE} from 'store/mutation-types';
  import {sendCaptcha} from 'api/general';
  import {changeMobile} from 'api/user';
  import {setTitle} from 'common/js/util';
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
        mobile: ''
      };
    },
    created() {
      setTitle('修改手机号');
    },
    methods: {
      sendCaptcha() {
        this.$validator.validate('mobile').then((result) => {
          if (result) {
            this.sending = true;
            sendCaptcha(this.mobile, 805061).then(() => {
              this._setInterval();
            }).catch(() => {
              this._clearInterval();
            });
          }
        });
      },
      _changeMobile() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            changeMobile(this.mobile, this.captcha)
              .then(() => {
                this.$refs.toast.show();
                this.loadFlag = false;
                this.setUserMobile(this.mobile);
                setTimeout(() => {
                  this.$router.back();
                }, 500);
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
