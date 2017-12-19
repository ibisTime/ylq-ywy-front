<template>
  <div class="full-screen-wrapper nickname-wrapper">
    <div class="form-wrapper">
      <div class="form-item">
        <div class="item-label">新昵称</div>
        <div class="item-input-wrapper">
          <input v-focus type="text" class="item-input" name="nickname" v-model="nickname" v-validate="'required|max:6'" placeholder="请输入新昵称(最多6位)">
          <span v-show="errors.has('nickname')" class="error-tip">{{errors.first('nickname')}}</span>
        </div>
      </div>

      <div class="form-btn">
        <button :disabled="setting" @click="_changeNickname">保存</button>
      </div>
      <full-loading v-show="!user"></full-loading>
      <toast ref="toast" text="修改成功"></toast>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {SET_USER_NICKNAME} from 'store/mutation-types';
  import {changeNickname, getUser} from 'api/user';
  import {setTitle} from 'common/js/util';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {directiveMixin} from 'common/js/mixin';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        setting: false,
        nickname: ''
      };
    },
    created() {
      setTitle('修改昵称');
      this._getUser();
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      _getUser() {
        if (!this.user) {
          getUser().then((data) => {
            this.nickname = data.nickname || '';
            this.setUser(data);
          }).catch(() => {});
        } else {
          this.nickname = this.user.nickname || '';
        }
      },
      _changeNickname() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.setting = true;
            changeNickname(this.nickname).then(() => {
              this.$refs.toast.show();
              this.setNickname(this.nickname);
              setTimeout(() => {
                this.$router.back();
              }, 1000);
            }).catch(() => {
              this.setting = false;
            });
          }
        });
      },
      ...mapMutations({
        setNickname: SET_USER_NICKNAME
      })
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/scss/variable";

  .nickname-wrapper {
    background: $color-background;
  }
</style>
