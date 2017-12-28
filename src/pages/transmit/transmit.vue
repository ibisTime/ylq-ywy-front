<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input v-focus type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入对方业务员的手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">登录密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" name="pwd" v-model="pwd" v-validate="'required|min:6'" placeholder="请输入您的登录密码">
          <span v-show="errors.has('pwd')" class="error-tip">{{errors.first('pwd')}}</span>
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
        pwd: '',
        mobile: ''
      };
    },
    created() {
      setTitle('转发报告');
    },
    methods: {
      transmitReport() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            transmitReport(this.mobile, this.pwd, this.$route.path.split('/')[2]).then(() => {
              this.$refs.toast.show();
              this.loadFlag = false;
              setTimeout(() => {
                this.$router.back();
              }, 500);
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
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
