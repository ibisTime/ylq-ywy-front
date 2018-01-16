<template>
  <div class="full-screen-wrapper certification-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">姓名</div>
        <div v-if="isRead" class="inner-label">{{realname}}</div>
        <div v-else class="item-input-wrapper">
          <input v-focus type="text" name="realname" class="item-input" v-model="realname" v-validate="'required|max:20'" placeholder="请输入真实姓名">
          <span v-show="errors.has('realname')" class="error-tip">{{errors.first('realname')}}</span>
        </div>
      </div>
      <div class="form-item">
        <div class="item-label">身份证号</div>
        <div v-if="isRead" class="inner-label">{{idCard}}</div>
        <div v-else class="item-input-wrapper">
          <input type="text" class="item-input" name="idCard" v-model="idCard" v-validate="'required|idCard'" placeholder="请输入身份证号">
          <span v-show="errors.has('idCard')" class="error-tip">{{errors.first('idCard')}}</span>
        </div>
      </div>
      <div v-if="!isRead" class="form-btn">
        <button @click="certification">提交</button>
      </div>
    </div>
    <full-loading v-show="loadFlag" :title="loadText"></full-loading>
    <toast ref="toast" text="认证成功"></toast>
  </div>
</template>
<script>
  import {mapMutations, mapGetters} from 'vuex';
  import {SET_USER_REALNAME, SET_USER} from 'store/mutation-types';
  import FullLoading from 'base/full-loading/full-loading';
  import Toast from 'base/toast/toast';
  import {setTitle} from 'common/js/util';
  import {directiveMixin} from 'common/js/mixin';
  import {certification, getUser} from 'api/user';

  export default {
    mixins: [directiveMixin],
    data() {
      return {
        loadFlag: false,
        loadText: '加载中...',
        realname: '',
        idCard: '',
        isRead: false
      };
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      setTitle('实名认证');
      if (this.$route.query.read) {
        this.isRead = true;
        this.loadFlag = true;
        this.getUser().then(() => {
          this.loadFlag = false;
        }).catch(() => {
          this.loadFlag = false;
        });
      }
    },
    methods: {
      getUser() {
        if (this.user) {
          this.realname = this.user.realName;
          this.idCard = this.user.idNo;
          return Promise.resolve();
        }
        return getUser().then((data) => {
          this.realname = data.realName;
          this.idCard = data.idNo;
          this.setUser(data);
        });
      },
      certification() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loadFlag = true;
            this.loadText = '提交中...';
            certification(this.realname, this.idCard).then(() => {
              this.setRealName({
                realName: this.realname,
                idNo: this.idCard
              });
              this.loadFlag = false;
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.back();
              }, 300);
            }).catch(() => {
              this.loadFlag = false;
            });
          }
        });
      },
      ...mapMutations({
        'setRealName': SET_USER_REALNAME,
        'setUser': SET_USER
      })
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .certification-wrapper {
    background-color: $color-background;
  }
</style>
