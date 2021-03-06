<template>
    <div class="full-screen-wrapper user-wrapper">
      <scroll :hasMore="hasMore" :data="flowList">
        <router-link tag="div" to="/user/setting" class="header">
          <div class="cd-flexbox cd-align-center">
            <div class="cd-avatar-box user-avatar"><img :src="getAvatar()"></div>
            <div class="cd-flex1 user-message">
              <p class="over-hide">{{nickname}}</p>
              <p>{{mobile}}</p>
            </div>
            <div class="right-arrow"></div>
          </div>
        </router-link>
        <div class="main-cont cd-bg-fff">
          <router-link to='/user/service' tag='div' class="line-item cd-flexbox cd-align-center">
            <div class="icon-money"></div>
            <div class="price cd-flex1"><label>橙券</label>{{amount | formatAmount}}</div>
            <div class="right-arrow right-arrow-gray"></div>
          </router-link>
          <div class="line-item cd-flexbox cd-align-center" @click="$router.push('/user/bills')">
            <div class="icon-bill"></div>
            <div class="price cd-flex1"><label>账单</label></div>
            <div class="right-arrow right-arrow-gray"></div>
          </div>
          <div class="bill-flow border-top-1px" v-show="flowList.length">
            <ul>
              <li class="border-bottom-1px" v-for="item in flowList">
                <div class="date">
                  <div class="day">{{item.createDatetime | formatDate('yy/MM/dd')}}</div>
                  <div class="time">{{item.createDatetime | formatDate('hh:mm')}}</div>
                </div>
                <div class="icon" :class="iconCls(item.transAmount)"></div>
                <div class="info over-hide">
                  <p class="trans-amount" :class="iconCls(item.transAmount)">{{item.transAmount | formatFlowAmount}}</p>
                  <p class="note over-hide">{{item.bizNote}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
      <full-loading v-show="loadingFlag"></full-loading>
      <router-view></router-view>
    </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {SET_USER} from 'store/mutation-types';
  import FullLoading from 'base/full-loading/full-loading';
  import Scroll from 'base/scroll/scroll';
  import {setTitle, formatAvatar} from 'common/js/util';
  import {commonMixin} from 'common/js/mixin';
  import {getUser} from 'api/user';
  import {getAccount, getPageFlow} from 'api/account';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        loadingFlag: false,
        amount: '',
        flowList: [],
        accountNumber: ''
      };
    },
    computed: {
      nickname() {
        return this.user ? this.user.nickname : '';
      },
      mobile() {
        return this.user ? this.user.mobile : '';
      },
      ...mapGetters([
        'user'
      ])
    },
    created() {
      this.first = true;
      this.hasMore = false;
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/user') {
          setTitle('个人中心');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          Promise.all([
            this.queryUser(),
            this.getAccount()
          ]).then(() => {
            this.loadingFlag = false;
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      queryUser() {
        return getUser().then((data) => {
          this.setUser(data);
        });
      },
      getAccount() {
        return getAccount().then((data) => {
          for(let v of data) {
            if (v.currency === 'CNY') {
              this.amount = v.amount;
              this.accountNumber = v.accountNumber;
            }
          }
          getPageFlow(1, 10, this.accountNumber).then((data1) => {
            this.flowList = data1.list;
          }).catch(() => {});
        });
      },
      getAvatar() {
        if (!this.user) {
          return require('./avatar.png');
        }
        return formatAvatar(this.preview || this.user.photo);
      },
      iconCls(amount) {
        return amount >= 0 ? 'in' : 'out';
      },
      ...mapMutations({
        'setUser': SET_USER
      })
    },
    components: {
      Scroll,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .user-wrapper {
    .header {
      padding: 0.45rem 0.3rem;
      background-color: $primary-color;
    }
    .user-avatar {
      width: 1.1rem;
      height: 1.1rem;
      flex: 0 0 1.1rem;
    }
    .user-message {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      font-size: $font-size-large-ss;
      color: #fff;
      p+p {
        margin-top: 0.2rem;
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
        @include bg-image('more-gray');
      }
    }

    .main-cont {
      padding: 0 0.3rem;
    }
    .line-item {
      height: 1rem;
      .icon-money {
        height: 100%;
        width: 0.28rem;
        @include bg-image('money');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.28rem;
      }
      .icon-bill {
        height: 100%;
        width: 0.28rem;
        @include bg-image('bill');
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
    }
    .bill-flow {
      padding: 0.05rem 0;
      @include border-top-1px($color-border);
      ul {
        li {
          display: flex;
          align-items: flex-start;
          padding: 0.2rem 0;
          @include border-bottom-1px($color-border);
          &:last-child {
            @include border-none();
          }
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
    }
  }
</style>
