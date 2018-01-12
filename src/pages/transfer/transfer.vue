<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="item-input-wrapper">
          <input type="tel" class="item-input" name="mobile" v-model="mobile" v-validate="'required|mobile'" placeholder="请输入对方手机号">
          <span v-show="errors.has('mobile')" class="error-tip">{{errors.first('mobile')}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">数量</div>
        <div class="item-input-wrapper">
          <input type="number" class="item-input" name="number" v-model="number" v-validate="'required|numeric'" placeholder="请输入您要转赠的数量">
          <!--<span v-show="errors.has('number')" class="error-tip">{{errors.first('number')}}</span>-->
        </div>
      </div>
      <div class="form-btn">
        <button @click="transfer()">确定</button>
      </div>
      <toast ref="toast" :text="toastText"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
    <confirm :text="text" ref='confirm' @confirm="handleConfirm"></confirm>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import {CHANGE_ACCOUNT_MONEY} from 'store/mutation-types';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import {transfer} from 'api/account';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import Confirm from 'base/confirm/confirm';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: false,
        remark: '',
        captBtnText: '获取验证码',
        number: '',
        mobile: '',
        text: '',
        toastText: ''
      };
    },
    created() {
      setTitle('橙券转赠');
    },
    methods: {
      transfer() {
        this.$validator.validate('mobile').then((data) => {
          if(data) {
            if (this.number >= 1) {
              this.text = '确定转赠吗';
              this.$refs.confirm.show();
            } else {
              this.toastText = '转赠金额需大于等于1';
              this.$refs.toast.show();
            }
          } else {
            this.toastText = '请输入正确的手机号';
            this.$refs.toast.show();
          }
        });
      },
      handleConfirm() {
        transfer(this.mobile, this.number).then(() => {
          this.toastText = '提交成功';
          this.$refs.toast.show();
          this.changeMoney(this.number);
          this.$emit('transfer');
          setTimeout(() => {
            this.$router.back();
          }, 500);
        });
      },
      ...mapMutations({
        changeMoney: CHANGE_ACCOUNT_MONEY
      })
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
