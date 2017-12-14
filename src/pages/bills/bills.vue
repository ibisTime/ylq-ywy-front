<template>
  <div class="full-screen-wrapper head-wrapper">
    <div class="bill-item cd-flexbox" v-for="item in data1">
      <div class="bill-name">{{item.bizNote}}</div>
      <div class="bill-price cd-flex1">{{item.transAmount}}</div>
      <div class="bill-datetime">{{item.createDatetime}}</div>
    </div>
  </div>
</template>
<script>
  import {getAccount, getPageFlow} from 'api/account';

  export default {
    data() {
      return {
        data: '',
        data1: []
      };
    },
    created() {
      getAccount().then((data) => {
        for(let v of data) {
          if(v.currency === 'CNY') {
            this.data = v;
            this.data.currency = '人民币';
          }
        }
        getPageFlow(1, 10, this.data.accountNumber).then((data1) => {
          this.data1 = data1.list;
        });
      });
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .head-wrapper {
    background-color: $color-background;

    .bill-item {
      line-height: 0.56rem;
      font-size: $font-size-medium-s;
      height: 1.2rem;
      border-bottom:1px solid #eee;
      background: #fff;
      padding: 0.3rem;
      .bill-price {
        text-align: center;
      }
    }


  }
</style>
