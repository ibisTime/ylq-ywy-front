<template>
  <div class="home-wrapper">
    <div class="content">
      {{name}}
      {{status}}
    </div>
    <div class="buttons">
      <button class="start" @click="changeStatus(true)">启用</button>
      <button class="stop" @click="changeStatus(false)">停用</button>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';

  export default {
    data() {
      return {
        name: null,
        status: null
      };
    },
    created() {
      setTitle('接口详情');
      let name = this.$route.params.name;
      let status = this.$route.params.status;
      // 将数据放在当前组件的数据内
      this.name = name;
      this.status = status;
    },
    methods: {
      changeStatus(status) {
        if(this.status && !status || !this.status && status) {         // 进来的时候是使用中，点击了停用
          this.$router.go(-1);
        }
        this.$emit('changeTemplet', {name: this.name, status: status});
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
    .content{
       width: 100%;
       height: 6rem;
       background: skyblue;
       padding: 0.3rem;
     }
    .buttons{
      width: 100%;
      height: 1.3rem;
      position: fixed;
      bottom: 0;
      padding:0.2rem 0.3rem;

      button{
        border-radius: 0.1rem;
        width: 48%;
        height: 0.9rem;
        font-size: 0.36rem;
        color: #fff;
      }
      .start{
        background: $primary-color;
        margin-right: 2%;
      }
      .stop{
        background: #ffae00;
      }
    }
  }


</style>
