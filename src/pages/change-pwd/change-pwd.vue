<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">旧密码</div>
        <div class="item-input-wrapper">
          <input v-focus type="password" class="item-input" v-model="oriPwd" @change="oriPwdValid" placeholder="请输入旧密码">
          <span v-show="oriErr" class="error-tip">{{oriErr}}</span>
        </div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="item-label">新密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="newPwd" @change="newPwdValid" placeholder="新密码不能少于6位">
          <span v-show="newErr" class="error-tip">{{newErr}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">确认密码</div>
        <div class="item-input-wrapper">
          <input type="password" class="item-input" v-model="rePwd" @change="rePwdValid" placeholder="请再次输入密码">
          <span v-show="reErr" class="error-tip">{{reErr}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button :disabled="setting" @click="changePwd">保存</button>
      </div>
      <toast ref="toast" text="修改成功"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import {changePwd} from 'api/user';
  import {pwdValid, rePwdValid, emptyValid, setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        oriPwd: '',
        oriErr: '',
        newPwd: '',
        newErr: '',
        rePwd: '',
        reErr: '',
        setting: false
      };
    },
    created() {
      setTitle('修改登录密码');
    },
    methods: {
      changePwd() {
        if (this.valid()) {
          this.loadFlag = true;
          changePwd(this.oriPwd, this.newPwd)
            .then(() => {
              this.loadFlag = false;
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.back();
              }, 500);
            }).catch(() => {
              this.loadFlag = false;
            });
        }
      },
      valid() {
        let r1 = this.oriPwdValid();
        let r2 = this.newPwdValid();
        let r3 = this.rePwdValid();
        return r1 && r2 && r3;
      },
      oriPwdValid() {
        let result = emptyValid(this.oriPwd);
        this.oriErr = result.msg;
        return !result.err;
      },
      newPwdValid() {
        let result = pwdValid(this.newPwd);
        this.newErr = result.msg;
        return !result.err;
      },
      rePwdValid() {
        let result = rePwdValid(this.rePwd, this.newPwd);
        this.reErr = result.msg;
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
