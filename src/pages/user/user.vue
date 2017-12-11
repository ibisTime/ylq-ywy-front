<template>
    <div class="full-screen-wrapper user-wrapper">
      <router-link tag="div" to="/user/setting" class="header">
        <div class="cd-flexbox cd-align-center">
          <div class="cd-avatar-box user-avatar"><img src="./avatar.png"></div>
          <div class="cd-flex1 user-message">
            <p class="over-hide">{{nickName}}</p>
            <p>{{mobile}}</p>
          </div>
          <div class="right-arrow"></div>
        </div>
      </router-link>
      <div class="main-cont cd-bg-fff">
        <div class="line-item cd-flexbox cd-align-center" @click="$router.push('/service')">
          <div class="icon-money"></div>
          <div class="price cd-flex1"><label>{{data.currency}}</label>{{data.amount}}</div>
          <div class="right-arrow right-arrow-gray"></div>
        </div>
        <div class="line-item cd-flexbox cd-align-center" @click="$router.push('/user/bills')">
          <div class="icon-bill"></div>
          <div class="price cd-flex1"><label>账单</label></div>
          <div class="right-arrow right-arrow-gray"></div>
        </div>
        <div class="bill-flow border-top-1px">
          <div class="bill-item cd-flexbox" v-for="item in data1">
            <div class="bill-name">{{item.bizNote}}</div>
            <div class="bill-price cd-flex1">{{item.transAmount}}</div>
            <div class="bill-datetime">{{item.createDatetime}}</div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {queryUser} from 'api/biz';
  import {getAccount, getPageFlow} from 'api/account';

  export default {
    data() {
      return {
        nickName: '',
        mobile: '',
        data: '',
        data1: []
      };
    },
    created() {
      setTitle('个人中心');
      queryUser().then((data) => {
        this.nickName = data.nickname;
        this.mobile = data.mobile;
      });
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
      .bill-item {
        line-height: 0.56rem;
        font-size: $font-size-medium-s;
        .bill-price {
          text-align: center;
        }
      }
    }
  }
</style>
