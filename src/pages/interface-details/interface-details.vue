<template>
  <div class="home-wrapper">
    <div class="content">
      {{description}}
    </div>
    <div class="buttons">
      <button class="start color1" @click="changeStatus(true)" >启用</button>
      <button class="stop color2" @click="changeStatus(false)" >停用</button>
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
        description: '',
        price: '',
        grey1: false,
        grey2: false
      };
    },
    created() {
      setTitle('接口详情');
      let code = this.$route.query.code;
      let status1 = this.$route.query.status;
      // 将数据放在当前组件的数据内
      this.code = code;
      if(status1 === 'true') {
        this.status = true;
      }else{
        this.status = false;
      }
      if(this.status) {
        // 使用中
        this.grey2 = true;
      }else{
        this.grey1 = true;
      }
      queryInterface(this.code).then((data) => {
        this.description = data.description;
        this.price = data.price;
      });
    },
    methods: {
      changeStatus(status) {
        if((this.status && !status) || (!this.status && status)) {       // 进来的时候是使用中，点击了停用
          this.$router.back();
          if(status) {
            // 如果是点了启用，就传正数的价格
            this.$emit('changeTemplet', {code: this.code, status: status, price: this.price});
          }else{
            this.$emit('changeTemplet', {code: this.code, status: status, price: -(this.price)});
          }
        }
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
    .color1{
      background: $primary-color;
    }
    .color2{
      background: #ffae00;
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
        /*background: #444;*/
      }
      .start{
        /*<!--background: $primary-color;-->*/
        margin-right: 2%;
      }
      .stop{
        /*background: #ffae00;*/
      }
    }
  }


</style>
