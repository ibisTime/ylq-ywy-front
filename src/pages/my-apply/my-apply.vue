<template>
  <div class="full-screen-wrapper head-wrapper">
    <div class="header">
      <div class="head-item" @click="toggleStatus(0)"><span :class="{active: tabIndex===0}">全部</span></div>
      <div class="head-item" @click="toggleStatus(1)"><span v-bind:class="{active: tabIndex===1}">待处理</span></div>
      <div class="head-item" @click="toggleStatus(2)"><span v-bind:class="{active: tabIndex===2}">已通过</span></div>
      <div class="head-item" @click="toggleStatus(3)"><span v-bind:class="{active: tabIndex===3}">已否决</span></div>
    </div>
    <div class="scroll-wrapper" v-if = "list.length">
      <scroll ref="scroll" :data="list" @pullingUp="getPageOrders" :hasMore="hasMore">
        <ul>
          <li class="line-item cd-flexbox cd-align-center" v-for="item in list" @click="toCheck(item.code, 'myApply')">
            <div class="date">
            <div class="day">{{item.applyDatetime | formatDate('yy/MM/dd')}}</div>
            <div class="time">{{item.applyDatetime | formatDate('hh:mm')}}</div>
            </div>
            <div class="date">
              <div class="day">{{item.accountName}}</div>
              <div class="time">{{item.bizNote}}</div>
            </div>
            <div class="info over-hide par0">
              <p class="trans-amount" :class="iconCls(item.amount)" >{{item.amount | formatAmount}}</p>
              <div>
                <p class="note over-hide" v-if="item.status === '1' || item.status === 1">待处理</p>
                <p class="note over-hide" v-if="item.status === '2' || item.status === 2">已否决</p>
                <p class="note over-hide" v-if="item.status === '3' || item.status === 3">已通过</p>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <div v-if = "!list.length" class="noOrders"><p>暂无相关订单</p></div>
    <router-view @checkResult="checkResult"></router-view>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import NoResult from 'base/no-result/no-result';
  import {getOrders1} from 'api/biz';
  import {getAccount} from 'api/account';
  import {getDictList} from 'api/general';
  import {commonMixin} from 'common/js/mixin';
  import {setTitle} from 'common/js/util';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        orders: [{
          config: {
            start: 1,
            limit: 20
          },
          hasMore: true,
          list: []
        }, {
          config: {
            start: 1,
            limit: 20,
            status: 1
          },
          hasMore: true,
          list: []
        }, {
          config: {
            start: 1,
            limit: 20,
            status: 3
          },
          hasMore: true,
          list: []
        }, {
          config: {
            start: 1,
            limit: 20,
            status: 2
          },
          hasMore: true,
          list: []
        }],
        tabIndex: 0
      };
    },
    created() {
      this.first = true;
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    computed: {
      list() {
        return this.orders[this.tabIndex].list;
      },
      hasMore() {
        return this.orders[this.tabIndex].hasMore;
      }
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/home/my-apply') {
          setTitle('转赠处理');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          getAccount().then((data) => {
            this.accountNumber = data[0].accountNumber;
            this.getPageOrders();
          });
        }
      },
      iconCls(amount) {
        return amount >= 0 ? 'in' : 'out';
      },
      getDictList() {
        getDictList('charge_status').then((data) => {
          return data;
        });
      },
      toCheck(code, from) {
        this.$router.push('/home/orders/check?code=' + code + '&from=' + from);
      },
      nothing() {},
      toggleStatus(index) {
        this.tabIndex = index;
        if(!this.orders[index].list.length && this.orders[index].hasMore) {
          this.getPageOrders();
        }
      },
      checkResult(n) {
        for(let i = 0; i < this.orders[1].list.length; i++) {
          if (this.orders[1].list[i].code === n.code) {
            this.orders[1].list.splice(i, 1);
            break;
          }
        }
        let nextStatus = n.status ? 3 : 2;
        for(let i = 0; i < this.orders[0].list.length; i++) {
          if (this.orders[0].list[i].code === n.code) {
            this.orders[0].list[i].status = nextStatus;
            console.log(this.orders[0].list[i].status);
            break;
          }
        }
        let nextIdx = n.status ? 2 : 3;
        this.orders[nextIdx].list = [];
        this.orders[nextIdx].hasMore = true;
        this.orders[nextIdx].config.start = 1;
      },
      getPageOrders() {
        let index = this.tabIndex;
        let { config } = this.orders[index];
        getOrders1(this.accountNumber, config.start, config.limit, config.status).then((data) => {
          this.orders[index].list = this.orders[index].list.concat(data.list);
          this.orders[index].hasMore = config.start < data.totalPage;
          this.orders[index].config.start++;
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
    .fr{
      float: right
    }
    .header {
      background: #fff;
      height: 1rem;
      /*padding-top:0.3rem;*/

      border-bottom:1px solid #eee;
      .head-item {
        width: 25%;
        height: 1rem;
        float: left;
        text-align: center;
        padding-top:0.3rem;
        span {
          margin-top:0.3rem;
        }
        span.active {
          font-size: 0.3rem;
          color: $primary-color
        }
        span.normal {
          font-size: 0.2rem;
          color: #444444;
        }
      }
    }
    .scroll-wrapper {
      position: absolute;
      top: 1rem;
      bottom: 0;
      width: 100%;
    }
    .noOrders {
      p {
        text-align: center;
        height: 1rem;
        font-size: 0.34rem;
        margin-top: 0.5rem;
      }
    }
    ul {
      background-color: $color-background;
      /*position: absolute;*/
      /*top: 0.5rem;*/
      /*bottom: 0rem;*/
      li {
        display: flex;
        align-items: flex-start;
        padding: 0.2rem 0;
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
        .date {
          width: 25%;
          white-space: nowrap;
          text-align: left;
          margin-top: 0.1rem;
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
        }
        .info {
          width: 33%;
          /*text-align: center;*/
          margin-top: 0.1rem;
          .note {
            padding-top: 0.18rem;
            line-height: 1.2;
            word-break: break-all;
            font-size: $font-size-small;
          }
          .trans-amount {
            /*<!--font-size: $font-size-large-s;-->*/
            font-size: $font-size-medium-xx;
            &.out {
              color: $primary-color;
            }
          }
        },
        .status {
          padding-top: 0.1rem;
          text-align: center;
      }
        .par0 {
          position: absolute;
          right: 0;
          .trans-amount {
            color: $primary-color;
          }
        }
      }
    }
    .line-item {
      padding: 0 0.3rem;
      height: 1rem;
      border-bottom: 1px solid #eee;
      background: #fff;
      .icon-help {
        height: 100%;
        width: 0.28rem;
        @include bg-image('question');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.28rem;
      }
      .icon-service {
        height: 100%;
        width: 0.28rem;
        @include bg-image('service');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.28rem;
      }
      .price {
        margin-left: 0.2rem;
        font-size: $font-size-medium;
        label {
          padding-right: 0.3rem;
          font-size: $font-size-medium-x;
        }
      }
      .right-arrow {
        height: 1.1rem;
        width: 0.16rem;
        flex: 0 0 0.16rem;
        @include bg-image('more');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.16rem;
        &.right-arrow-gray {
          height: 100%;
          @include bg-image('more-gray');  }
      }
    }
  }
</style>
