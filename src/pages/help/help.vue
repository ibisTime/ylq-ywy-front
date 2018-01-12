<template>
  <div class="full-screen-wrapper head-wrapper">
    <scroll :hasMore=false :data="list">
      <ul>
        <router-link to='/user/service' tag='div' class="line-item cd-flexbox cd-align-center">
          <div class="icon-service"></div>
          <div class="price cd-flex1"><label>联系客服</label></div>
          <div class="right-arrow right-arrow-gray"></div>
        </router-link>
        <router-link to='/user/question' tag='div' class="line-item cd-flexbox cd-align-center">
          <div class="icon-help"></div>
          <div class="price cd-flex1"><label>操作指南</label></div>
          <div class="right-arrow right-arrow-gray"></div>
        </router-link>
      </ul>
    </scroll>
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
          this.list = this.list.concat(res.list);
          if (res.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.start++;
        });
      });
    },
    methods: {
      iconCls(amount) {
        return amount >= 0 ? 'in' : 'out';
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
      background-color: $color-background;
      .line-item {
        padding: 0 0.3rem;
        height: 1rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        .icon-help {
          height: 0.36rem;
          width: 0.36rem;
          background-image: url('./question@3x.png');
          background-repeat: no-repeat;
          /*background-position: center;*/
          background-size: 0.36rem;
          margin-left: 0.1rem;
          /*margin-top:0.32rem;*/
          box-sizing: border-box;
        }
        .icon-service {
          height: 0.36rem;
          width: 0.36rem;
          background-image: url('./service@3x.png');
          background-repeat: no-repeat;
          /*background-position: center;*/
          background-size: 0.36rem;
          margin-left: 0.1rem;
          /*margin-top:0.32rem;*/
          box-sizing: border-box;
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
            @include bg-image('more-gray');
          }
        }
      }
    }
  }
</style>
