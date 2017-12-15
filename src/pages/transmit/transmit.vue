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
        <div class="item-label">您的密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="pwd" @change="_pwdValid" placeholder="请输入您的密码">
          <span v-show="pwdErr" class="error-tip">{{pwdErr}}</span>
        </div>
      </div>

      <div class="form-btn">
        <button @click="transmitReport">转发报告</button>
      </div>
      <toast ref="toast" text="转发成功"></toast>
      <full-loading v-show="loadFlag" title="转发中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {transmitReport} from 'api/biz';
  import {mobileValid, pwdValid, setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: false,
        pwd: '',
        pwdErr: '',
        captBtnText: '获取验证码',
        mobile: '',
        mobErr: ''
      };
    },
    created() {
      setTitle('转发报告');
    },
    methods: {
      transmitReport() {
        if (this._valid()) {
          this.loadFlag = true;
          transmitReport(this.mobile, this.pwd, this.$route.path.split('/')[2])
            .then(() => {
              this.$refs.toast.show();
              this.loadFlag = false;
              setTimeout(() => {
                this.$router.back();
              }, 500);
            }).catch(() => {
              this.loadFlag = false;
            });
        }
      },
      _valid() {
        let r1 = this._mobileValid();
        let r2 = this._pwdValid();
        return r1 && r2;
      },
      _mobileValid() {
        let result = mobileValid(this.mobile);
        this.mobErr = result.msg;
        return !result.err;
      },
      _pwdValid() {
        let result = pwdValid(this.pwd);
        this.pwdErr = result.msg;
        return !result.err;
      }
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
