<template>
  <div class="/head-wrapper" >
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
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .head-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .bill-item {
      line-height: 0.56rem;
      font-size: $font-size-medium-s;
      .bill-price {
        text-align: center;
      }
    }


  }
</style>
