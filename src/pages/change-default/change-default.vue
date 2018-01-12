<template>
  <div class="home-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">是否默认</div>
        <div class="item-input-wrapper">
          <input type="radio" id="one" value="1" v-model="isDefault" checked name="isDefault">
          <!--<label for="one">是</label>-->
          <!--<input type="radio" id="zero" value="0" v-model="isDefault" style="border:1px solid red;width: 0.3rem;height: 0.3rem;" name="isDefault">-->
          <!--<label for="zero">否</label>-->
          <!--<input type="radio" class="item-input" v-model="isDefault" value="0">否-->
        </div>
      </div>
      <div class="form-btn">
        <button @click="changeDefault()">确定</button>
      </div>
      <toast ref="toast" text="修改成功"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';

  import {setTitle, emptyValid} from 'common/js/util';

  export default {
    data() {
      return {
        name: null,
        nameErr: '',
        loadFlag: false,
        isDefault: ''
      };
    },
    created() {
      setTitle('接口详情');
      let name = this.$route.params.name;
      // 将数据放在当前组件的数据内
      this.name = name;
    },
    methods: {
      changeDefault() {
//        this.$emit('changeDefault', {name: this.name});
//        this.$router.go(-1);
      },
      nameValid() {
        let result = emptyValid(this.name);
        this.nameErr = result.msg;
        return !result.err;
      },
      valid() {
        let r1 = this.nameValid();
        return r1;
      }
    },
    components: {
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .fr{
      float: right;
    }
  }


</style>
