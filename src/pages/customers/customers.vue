<template>
    <div class="full-screen-wrapper customer-wrapper">
      <scroll :data="customerList" @pullingUp="getPageCustomers" :hasMore="hasMore">
        <div class="content">
          <div v-for="(item,index) in customerList" class="customer-item border-bottom-1px">
            <div class="inner cd-flexbox" ref="customer" @click="selectItem(item)">
              <div class="status-icon">
                <i class="circle-icon" v-show="item.status === '0'"></i>
                <div class="cd-avatar-box">
                  <div class="status unread" v-if="item.status === '0'">未读</div>
                  <div class="status read" v-if="item.status === '1'">已读</div>
                  <div class="status outdate" v-if="item.status === '2'">已过期</div>
                </div>
              </div>
              <div class="cd-flex1 cus-info">
                <!-- 12222222222 男 29岁 芝麻分555分 浙江省杭州市余杭区梦想小镇天使村8号楼宜车叮叮2楼橙袋科技 -->
                <div class="top">{{getRealName(item)}}<span>{{item.readCount}}人</span></div>
                <div class="introduce twoline-ellipsis">{{getUserInfo(item)}}</div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <no-result v-show="noResult" class="full-screen-wrapper no-result-wrapper" title="暂无客户"></no-result>
      <toast ref="toast" text="报告已过期"></toast>
      <router-view></router-view>
    </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  import NoResult from 'base/no-result/no-result';
  import {setTitle} from 'common/js/util';
  import {getPageCustomers} from 'api/biz';

  export default {
    data() {
      return {
        start: 1,
        limit: 20,
        hasMore: true,
        customerList: [],
        realName: ''
      };
    },
    created() {
      this.first = true;
      this.touch = {};
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    computed: {
      noResult() {
        return !this.hasMore && !this.customerList.length;
      }
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/customers') {
          setTitle('我的客户');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.getPageCustomers();
        }
      },
      getPageCustomers() {
        getPageCustomers(this.start, this.limit).then((data) => {
          this.customerList = this.customerList.concat(data.list);
          if (data.totalCount <= this.limit || data.list.length < this.limit) {
            this.hasMore = false;
          }
          this.start++;
        }).catch(() => {});
      },
      getRealName(item) {
        if (item['F2']) {
          return JSON.parse(item['F2']).realName;
        }
        return '';
      },
      getUserInfo(item) {
        let mobile = JSON.parse(item['F1']).mobile;
        let address = '';
        let sex = ' ';
        let age = ' ';
        if (item['F3']) {
          let f3 = JSON.parse(item['F3']);
          address = ' ' + f3.provinceCity + f3.address;
        }
        if (item['F2']) {
          let f2 = JSON.parse(item['F2']);
          if(f2.idNo.length === 15) {
            sex += f2.idNo[14] % 2 === 0 ? '女' : '男';
            let nowyear = new Date().getFullYear();
            let birthyear = '19' + f2.idNo.substr(6, 2);
            age += nowyear - birthyear + '岁';
          }
          if(f2.idNo.length === 18) {
            sex += f2.idNo[16] % 2 === 0 ? '女' : '男';
            let nowyear = new Date().getFullYear();
            let birthyear = f2.idNo.substr(6, 4);
            age += nowyear - birthyear + '岁';
          }
        }
        return mobile + sex + age + address;
      },
      selectItem(item) {
        if (item.status === '2') {
          this.$refs.toast.show();
          return;
        }
        if (item.status === '0') {
          for (let i = 0; i < this.customerList.length; i++) {}
          this.customerList.forEach((report) => {
            if (report.code === item.code) {
              report.status = '1';
            }
          });
        }
        this.$router.push('/customers/' + item.code);
      }
    },
    components: {
      Scroll,
      Toast,
      NoResult
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .customer-wrapper {
    background-color: $color-background;
    .content {
      .customer-item {
        height: 1.5rem;
        @include border-bottom-1px($color-border);
        .inner {
          height: 100%;
          padding: 0.12rem 0.3rem 0.12rem 0.15rem;
          background-color: #fff;
          .status-icon {
            position: relative;
            padding: 0.14rem 0.2rem 0.14rem 0.35rem;
            width: 1.45rem;
            .circle-icon {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translate(0, -50%);
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background-color: $primary-color;
            }
            .cd-avatar-box {
              width: 100%;
              height: 0.9rem;
              .status {
                border-radius: 50%;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 0.9rem;
                color: #fff;
              }
              .unread {
                background: #5ea3f2;
              }
              .read {
                background: #0cb8ae;
              }
              .outdate {
                background: #fcb224;
              }
            }
          }
          .cus-info {
            .top {
              font-size: $font-size-medium-xx;
              height: 0.36rem;
              span {
                float: right;
                font-size: $font-size-medium;
                color: $color-gray;
              }
            }
            .introduce {
              padding-top: 0.11rem;
              line-height: 0.42rem;
              font-size: $font-size-medium;
              color: $color-gray;
            }
          }
        }
        .delete {
          position: absolute;
          top: 0;
          right: 0;
          z-index: -1;
          width: 68px;
          height: 1.48rem;
          line-height: 1.5rem;
          text-align: center;
          font-size: $font-size-large-s;
          background-color: $color-red;
          color: #fff;
        }
      }
    }
    .no-result-wrapper {
      padding-top: 2.54rem;
      background-color: #fff;
    }
  }
</style>
