<template>
  <div class="full-screen-wrapper my-templet-wrapper">
    <div class='templet' v-for='(item,index) in templets' :key="item.code">
      <div class="inner cd-flexbox"
           :ref="'customer'+index"
           @touchstart.stop.prevent="item.isSystem === '0'?touchstart(index,$event):toTempletDetail(item.code)"
           @touchmove.stop.prevent="item.isSystem === '0'?touchmove($event):toTempletDetail(item.code)"
           @touchend.stop.prevent="item.isSystem === '0'?touchend($event):toTempletDetail(item.code)">
        <span class="type">{{item.name}}</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
        <span class="fr price">{{item.totalPrice | formatAmount}}元</span>
      </div>
      <div class="delete" ref="deleteEle" @click="deleteItem(item, index)" v-if="item.isSystem === '0'">删除</div>
    </div>
    <router-link tag="div" to="/my-templet/templet-details" class="down">
      <button><span>创建模板</span></button>
    </router-link>
    <toast ref="toast" text="删除成功"></toast>
    <full-loading v-show="loadFlag"></full-loading>
    <router-view @addTemplet="addTemplet" @editTemplet="editTemplet"></router-view>
  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {setTitle} from 'common/js/util';
  import {queryTemplet, delTemplet} from 'api/biz';
  import {commonMixin} from 'common/js/mixin';
  import {prefixStyle} from 'common/js/dom';

  const transform = prefixStyle('transform');
  const transitionDuration = prefixStyle('transitionDuration');
  export default {
    mixins: [commonMixin],
    data() {
      return {
        loadFlag: false,
        templets: []
      };
    },
    created() {
      this.first = true;
      setTitle('资信报告');
      this.touch = {};
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/my-templet') {
          setTitle('资信报告');
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadFlag = true;
          queryTemplet().then((data) => {
            this.loadFlag = false;
            this.templets = data.list;
          });
        }
      },
      addTemplet() {
        queryTemplet().then((data) => {
          this.templets = data.list;
        });
      },
      editTemplet() {
        queryTemplet().then((data) => {
          this.templets = data.list;
        });
      },
      deleteItem(item, index) {
        delTemplet(item.code).then(() => {
          this.touch[index].offset = 0;
          this.$refs.toast.show();
          queryTemplet().then((data) => {
            this.loadFlag = false;
            this.templets = data.list;
          });
        });
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
//        this.$refs.customer[index].style[transform] = `translate3d(${offset}px,0,0)`;
        this.$refs['customer' + index][0].style[transform] = `translate3d(${offset}px,0,0)`;
        this.$refs.deleteEle[index].style['zIndex'] = -1;
      },
      touchend() {
        const index = this.touch.currentIndex;
        let deltaX = this.touch[index].x2 - this.touch[index].x1;

        if (!this.touch.moved) {
          let deltaY = this.touch[index].y2 - this.touch[index].y1;
          if (Math.abs(deltaX) < 5 || Math.abs(deltaY)) {
            this.$router.push('/my-templet/templet-details?code=' + this.templets[index].code);
          }
          return;
        }
//        const currentElem = this.$refs.customer[index];
        const currentElem = this.$refs['customer' + index][0];
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
      },
      // 从模板点击进入模板详情
      toTempletDetail(code) {
        this.$router.push('/my-templet/templet-details?code=' + code);
      }
    },
    components: {
      FullLoading,
      Toast
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .my-templet-wrapper {
    .fr {
      float: right;
    }
    .delete {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      width: 68px;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: $font-size-large-s;
      background-color: $color-red;
      color: #fff;
    }
    .templet {
      width: 100%;
      height: 1rem;
      border-bottom: 0.01rem solid $color-border;
      position: relative;
      .inner {
        padding-left: 0.3rem;
        background: #fff;
      }
      .type {
        line-height: 1rem;
        font-size: $font-size-medium-x;
      }
      .price {
        position: absolute;
        right: 0.65rem;
        line-height: 1rem;
        font-size: $font-size-medium;
        color: $primary-color;
      }
      img {
        position: absolute;
        width: 0.15rem;
        height: 0.25rem;
        right: 0;
        margin: 0.35rem 0.3rem 0 0.2rem;
      }
    }

    .down {
      padding:0.8rem 0.3rem;
      background: transparent;
      button {
        width: 100%;
        height: 0.9rem;
        background: $primary-color;
        border-radius: 0.1rem ;
        span {
          color: #fff;
          font-size: $font-size-large-s;
        }
      }
    }

  }


</style>
