<template>
  <div class="full-screen-wrapper change-templetname-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">模板名称</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" name="name" v-model="name" v-validate="'required|max:32'" placeholder="请输入模板名称">
          <span v-show="errors.has('name')" class="error-tip">{{errors.first('name')}}</span>
        </div>
      </div>
      <div class="form-btn">
        <button @click="changeName">确定</button>
      </div>
      <toast ref="toast" text="修改成功"></toast>
      <full-loading v-show="loadFlag" title="修改中..."></full-loading>
    </div>
  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {setTitle} from 'common/js/util';

  export default {
    data() {
      return {
        name: null,
        nameErr: '',
        loadFlag: false
      };
    },
    created() {
      setTitle('接口详情');
      let name = this.$route.query.name;
      // 将数据放在当前组件的数据内
      this.name = name;
    },
    methods: {
      changeName() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('changeName', {name: this.name});
            this.$router.go(-1);
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
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .change-templetname-wrapper {
    background-color: $color-background;
    .fr {
      float: right;
    }
  }


</style>
