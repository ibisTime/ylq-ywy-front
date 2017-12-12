<template>
    <div class="full-screen-wrapper customer-wrapper">
      <scroll :data="customerList" @pullingUp="getPageCustomers" :hasMore="hasMore">
        <div class="content">
          <div v-for="(item,index) in customerList" class="customer-item border-bottom-1px">
            <div class="inner cd-flexbox"
                 ref="customer"
                 @touchstart.stop.prevent="touchstart(index,$event)"
                 @touchmove.stop.prevent="touchmove($event)"
                 @touchend.stop.prevent="touchend($event)">
              <div class="status-icon">
                <i class="circle-icon"></i>
                <div class="cd-avatar-box"><img src="./avatar.png" /></div>
              </div>
              <div class="cd-flex1 cus-info">
                <!-- 12222222222 男 29岁 芝麻分555分 浙江省杭州市余杭区梦想小镇天使村8号楼宜车叮叮2楼橙袋科技 -->
                <div class="top">{{getRealName(item)}}<span>{{item.readCount}}人</span></div>
                <div class="introduce twoline-ellipsis">{{getUserInfo(item)}}</div>
              </div>
            </div>
            <div class="delete" ref="deleteEle" @click="deleteItem(item)">删除</div>
          </div>
        </div>
      </scroll>
      <no-result v-show="noResult" class="full-screen-wrapper no-result-wrapper" title="暂无客户"></no-result>
      <toast ref="toast" text="功能未实现"></toast>
      <router-view></router-view>
    </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  import NoResult from 'base/no-result/no-result';
  import {prefixStyle} from 'common/js/dom';
  import {setTitle} from 'common/js/util';
  import {getPageCustomers} from 'api/biz';

  const transform = prefixStyle('transform');
  const transitionDuration = prefixStyle('transitionDuration');
  export default {
    data() {
      return {
        start: 1,
        limit: 20,
        hasMore: true,
        customerList: []
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
        return JSON.parse(item['F1']).mobile;
      },
      getUserInfo(item) {
        let mobile = JSON.parse(item['F1']).mobile;
        let address = '';
        if (item['F3']) {
          let f3 = JSON.parse(item['F3']);
          address = ' ' + f3.provinceCity + f3.address;
        }
        return mobile + address;
      },
      selectItem(item) {
        this.$router.push('/customers/' + item.code);
      },
      deleteItem(item) {
        // console.log('delete');
        this.$refs.toast.show();
      },
      touchstart(index, event) {
        this.touch.initiated = true;
        // 用来判断是否是一次移动
        this.touch.moved = false;
        const touch = event.touches[0];
        this.touch[index] = this.touch[index] || {};
        this.touch[index].x1 = touch.pageX;
        this.touch[index].y1 = touch.pageY;
        this.touch[index].x2 = touch.pageX;
        this.touch[index].y2 = touch.pageY;
        this.touch[index].offset = this.touch[index].offset || 0;
        this.touch.currentIndex = index;
      },
      touchmove(event) {
        if (!this.touch.initiated) {
          return;
        }
        const touch = event.touches[0];
        const index = this.touch.currentIndex;
        this.touch[index].x2 = touch.pageX;
        this.touch[index].y2 = touch.pageY;
        const deltaX = touch.pageX - this.touch[index].x1;
        const deltaY = touch.pageY - this.touch[index].y1;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return;
        }
        if (!this.touch.moved) {
          this.touch.moved = true;
        }
        let offset = this.touch[index].offset + deltaX;
        this.$refs.customer[index].style[transform] = `translate3d(${offset}px,0,0)`;
        this.$refs.deleteEle[index].style['zIndex'] = -1;
      },
      touchend(event) {
        const index = this.touch.currentIndex;
        let deltaX = this.touch[index].x2 - this.touch[index].x1;

        if (!this.touch.moved) {
          let deltaY = this.touch[index].y2 - this.touch[index].y1;
          if (Math.abs(deltaX) < 5 || Math.abs(deltaY)) {
            this.selectItem(this.customerList[index]);
          }
          return;
        }
        const currentElem = this.$refs.customer[index];
        let zIndex = -1;

        if (deltaX <= 0) {
          if (deltaX <= -15) {
            currentElem.style[transform] = 'translate3d(-68px,0,0)';
            this.touch[index].offset = -78;
            zIndex = 0;
          } else {
            currentElem.style[transform] = 'translate3d(0,0,0)';
            this.touch[index].offset = 0;
          }
        } else {
          if (deltaX >= 15) {
            currentElem.style[transform] = 'translate3d(0,0,0)';
            this.touch[index].offset = 0;
          } else {
            currentElem.style[transform] = 'translate3d(0,0,0)';
            this.touch[index].offset = 0;
          }
        }
        currentElem.style[transitionDuration] = '300ms';
        currentElem.addEventListener('transitionend', () => {
          currentElem.style[transitionDuration] = '0ms';
        });
        this.$refs.deleteEle[index].style['zIndex'] = zIndex;
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
            }
          }
          .cus-info {
            .top {
              font-size: $font-size-medium-xx;
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
