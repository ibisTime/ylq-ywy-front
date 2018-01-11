<template>
  <div class="full-screen-wrapper head-wrapper">
    <scroll :hasMore="hasMore" :data="list" @pullingUp="getPageFlow" >
      <ul>
        <li class="border-bottom-1px" v-for="item in list">
          <div class="date">
            <div class="day">{{item.createDatetime | formatDate('yy/MM/dd')}}</div>
            <div class="time">{{item.createDatetime | formatDate('hh:mm')}}</div>
          </div>
          <div class="icon" :class="iconCls(item.transAmount)"></div>
          <div class="info">
            <p class="trans-amount" :class="iconCls(item.transAmount)">{{item.transAmount | formatFlowAmount}}</p>
            <p class="note">{{item.bizNote}}</p>
          </div>
        </li>
      </ul>
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
        for(let v of data) {
          if (v.currency === 'CNY') {
            this.accountNumber = v.accountNumber;
          }
        }
        this.getPageFlow();
      });
    },
    methods: {
      iconCls(amount) {
        return amount >= 0 ? 'in' : 'out';
      },
      getPageFlow() {
        getPageFlow(this.start, this.limit, this.accountNumber).then((res) => {
          this.list = this.list.concat(res.list);
          if (res.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.start++;
        });
      }
    },
    components: {
      Scroll,
      NoResult
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .head-wrapper {
    background-color: $color-background;

    ul {
      padding: 0 0.3rem;
      background-color: #fff;
      li {
        display: flex;
        align-items: flex-start;
        padding: 0.2rem 0;
        @include border-bottom-1px($color-border);
        .date {
          white-space: nowrap;
          text-align: left;
          .day {
            padding-top: 0.04rem;
            font-size: $font-size-medium-xx;
          }
          .time {
            padding-top: 0.14rem;
            font-size: $font-size-small;
            color: $color-text-l;
          }
        }
        .icon {
          margin-left: 0.32rem;
          flex: 0 0 0.72rem;
          width: 0.72rem;
          height: 0.72rem;
          background-size: 100%;
          &.in {
            @include bg-image('in');
          }
          &.out {
            @include bg-image('out');
          }
        }
        .info {
          padding-left: 0.32rem;
          .note {
            padding-top: 0.18rem;
            line-height: 1.2;
            word-break: break-all;
            font-size: $font-size-small;
          }
          .trans-amount {
            font-size: $font-size-large-s;
            color: $color-red;
            &.out {
              color: $primary-color;
            }
          }
        }
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
