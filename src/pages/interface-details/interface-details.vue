<template>
  <div class="home-wrapper">
    <div class="content">
      {{description}}
    </div>
    <div class="buttons">
      <button class="start" @click="changeStatus(true)">启用</button>
      <button class="stop" @click="changeStatus(false)">停用</button>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {queryInterface} from 'api/biz';

  export default {
    data() {
      return {
        name: null,
        status: null,
        description: ''
      };
    },
    created() {
      setTitle('接口详情');
      let code = this.$route.params.code;
      let status = this.$route.params.status;
      console.log(code);
      // 将数据放在当前组件的数据内
      this.code = code;
      this.status = status;
      queryInterface(this.code).then((data) => {
//        console.log(data.description);
        this.description = data.description;
      });
    },
    methods: {
      changeStatus(status) {
        if(this.status && !status || !this.status && status) {         // 进来的时候是使用中，点击了停用
          this.$router.go(-1);
        }
        this.$emit('changeTemplet', {code: this.code, status: status});
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
