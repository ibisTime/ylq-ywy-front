<template>
  <div class="full-screen-wrapper head-wrapper">
    <scroll :hasMore="hasMore" :data="list">
      <div class="bill-item cd-flexbox cd-align-center" v-for="item in list">
        <div class="bill-name">{{item.bizNote}}</div>
        <div class="bill-price cd-flex1">{{item.transAmount | formatAmount}}元</div>
        <div class="bill-datetime">{{item.createDatetime | formatDate}}</div>
      </div>
    </scroll>
    <div class="no-result-wrapper">
      <no-result v-show="!hasMore && !list.length" title="暂无账单"></no-result>
    </div>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import {getAccount, getPageFlow} from 'api/account';
  import {commonMixin} from 'common/js/mixin';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        list: [],
        start: 1,
        limit: 20,
        hasMore: true
      };
    },
    created() {
      getAccount().then((data) => {
        let accountNumber;
        for(let v of data) {
          if (v.currency === 'CNY') {
            accountNumber = v.accountNumber;
          }
        }
        getPageFlow(this.start, this.limit, accountNumber).then((res) => {
//          this.list = this.list.concat(res.list);
          if (res.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.start++;
        });
      });
    },
    components: {
      Scroll,
      NoResult
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .head-wrapper {
    background-color: $color-background;

    .bill-item {
      line-height: 1.3;
      padding: 0.2rem 0.3rem;
      font-size: $font-size-medium-s;
      border-bottom:1px solid #eee;
      background: #fff;
      .bill-price {
        padding: 0 0.2rem;
        text-align: center;
        white-space: nowrap;
      }
      .bill-datetime {
        white-space: nowrap;
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 40%;
      left: 0;
      transform: translateY(-50%);
    }
  }
</style>
