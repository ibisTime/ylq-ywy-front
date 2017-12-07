<template>
  <div class="home-wrapper">
    <div class="form-wrapper">
      <div class="form-item border-bottom-1px">
        <div class="item-label">模板名称</div>
        <div class="item-input-wrapper">
          <input type="text" class="item-input" v-model="name" placeholder="请输入模板名称">
        </div>
      </div>
      <div class="form-btn">
        <button @click="changeName">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    data() {
      return {
        name: null
      };
    },
    created() {
      setTitle('接口详情');
      let name = this.$route.params.name;
      // 将数据放在当前组件的数据内
      this.name = name;
      console.log(this.name);
    },
    methods: {
      changeName(status) {
        if(status) {
          this.$emit('changeName', {name: this.name});
        }
        this.$router.go(-1);
      }
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
    .templet{
      width: 100%;
      height: 1rem;
      padding: 0.35rem 0.3rem;
      border-bottom:0.01rem solid #eee;
      .type{
        font-size: 0.3rem;
        color: #484848;
      }
      .price{
        font-size: 0.28rem;
        color: $primary-color;
      }
      img{
        width: 0.15rem;
        margin-left: 0.2rem;
      }
      .status{
        font-size: 0.24rem;
        color: #484848;
        margin-top: 0.05rem;
      }
      &:nth-child(2){
        height: 0.6rem;
        padding-top: 0.23rem;
        background: rgb(245,245,245);
        .type{
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .buttons{
      width: 100%;
      height: 1.3rem;
      position: fixed;
      bottom: 0;
      padding:0.2rem 0.3rem;
      button{
        border-radius: 0.1rem;
        width: 100%;
        height: 0.9rem;
        font-size: 0.36rem;
        color: #fff;
      }
      .start{
        background: $primary-color;
        margin-right: 0.2rem;
      }
    }
  }


</style>
