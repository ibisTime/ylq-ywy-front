<template>
  <div class="full-screen-wrapper change-mobile-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">手机号</div>
        <div class="inner-label">{{mobile}}</div>
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
        <button @click="changeMobCaptValid">下一步</button>
      </div>
      <toast ref="toast" text="验证码错误"></toast>
      <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {SET_USER} from 'store/mutation-types';
  import {sendCaptcha} from 'api/general';
  import {getUser, changeMobCaptValid} from 'api/user';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        sending: false,
        loadFlag: true,
        loadText: '加载中...',
        captcha: '',
        captBtnText: '获取验证码'
      };
    },
    computed: {
      mobile() {
        return this.user && this.user.mobile || '';
      },
      ...mapGetters([
        'user'
      ])
    },
    created() {
      setTitle('验证手机');
      this.getUser().then(() => {
        this.loadFlag = false;
      }).catch(() => {
        this.loadFlag = false;
      });
    },
    methods: {
      getUser() {
        if (this.user) {
          return Promise.resolve();
        }
        return getUser().then((data) => {
          this.setUser(data);
        });
      },
      sendCaptcha() {
        if (this.mobile) {
          this.sending = true;
          sendCaptcha(this.mobile, 804082).then(() => {
            this._setInterval();
          }).catch(() => {
            this._clearInterval();
          });
        }
      },
      changeMobCaptValid() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadText = '校验中...';
            this.loadFlag = true;
            changeMobCaptValid(this.mobile, this.captcha, 804082).then((data) => {
              if (data.isSuccess) {
                this.loadFlag = false;
                this.$router.replace('/user/setting/change-mobile');
              } else {
                this.$refs.toast.show();
              }
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
        setUser: SET_USER
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
