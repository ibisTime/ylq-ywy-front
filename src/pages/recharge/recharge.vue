<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">数量</div>
        <div class="item-input-wrapper">
          <input type="number" class="item-input" name="number" v-model="number" v-validate="'required|numeric'" placeholder="请输入您要充值的数量">
          <!--<span v-show="errors.has('number')" class="error-tip">{{errors.first('number')}}</span>-->
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">备注</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="remark" v-model="remark"  placeholder="（选填）">
        </div>

      </div>
      <div class="form-btn">
        <button @click="recharge()">确定</button>
      </div>
      <toast ref="toast" :text="toastText"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
    <confirm :text="text" ref='confirm' @confirm="handleConfirm"></confirm>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import {recharge} from 'api/account';
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
        text: '',
        toastText: ''
      };
    },
    created() {
      setTitle('橙券充值');
    },
    methods: {
      recharge() {
        if(this.number >= 1) {
          this.text = '确定充值吗';
          this.$refs.confirm.show();
        } else {
          this.toastText = '充值金额需大于等于1';
          this.$refs.toast.show();
        }
      },
      handleConfirm() {
        recharge(this.number, this.remark).then(() => {
          this.toastText = '提交成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.back();
          }, 500);
        });
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
