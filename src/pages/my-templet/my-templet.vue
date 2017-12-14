<template>
  <div class="home-wrapper">
    <!--<div class='templet' @click="$router.push({name:urlName,params:{isSys:item.isSystem,code:item.code,xiugai:true}})" v-for='item in templets'>-->
    <div class='templet' v-for='(item,index) in templets'>
      <div class="inner cd-flexbox"
           ref="customer"
           @touchstart.stop.prevent="item.isSystem === '0'?touchstart(index,$event):toTempletDetail(item.isSystem, item.code)"
           @touchmove.stop.prevent="item.isSystem === '0'?touchmove($event):toTempletDetail(item.isSystem, item.code)"
           @touchend.stop.prevent="item.isSystem === '0'?touchend($event):toTempletDetail(item.isSystem, item.code)"
           @click="toTempletDetail(item.isSystem, item.code)">
        <span class="type">{{item.name}}</span>
        <img src="./more-gray@2x.png" alt="" class="fr">
        <span class="fr price">{{item.totalPrice | formatAmount}}元</span>
      </div>
      <div class="delete" ref="deleteEle" @click="deleteItem(item)" v-if="item.isSystem === '0'">删除</div>

    </div>
    <!--<div class="down" @click="$router.push({name:urlName,params:{changeFlag:true}})">-->
    <div class="down" @click="$router.push('/my-templet/templet-details?changeFlag='+true)">
      <button><span>创建模板</span></button>
    </div>
    <toast ref="toast" text="删除成功"></toast>
    <router-view @addTemplet="addTemplet" @editTemplet="editTemplet"></router-view>

  </div>
</template>
<script>
  import Toast from 'base/toast/toast';
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
        urlName: 'templet-details',
        templets: [],
        templet: [{
          name: '基础模板',
          price: 345
        }, {
          name: '小贷模板',
          price: 456
        }, {
          name: '我的模板',
          price: 128
        }]
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
          this.loadingFlag = true;
          queryTemplet().then((data) => {
            this.loadFlag = false;
            this.templets = data.list;
            for(let v of this.templets) {
              if(v.isSystem === '0') {

              }
            }
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
      deleteItem(item) {
        delTemplet(item.code).then((data) => {
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
        this.$refs.customer[index].style[transform] = `translate3d(${offset}px,0,0)`;
        this.$refs.deleteEle[index].style['zIndex'] = -1;
      },
      touchend(event) {
        const index = this.touch.currentIndex;
        let deltaX = this.touch[index].x2 - this.touch[index].x1;

        if (!this.touch.moved) {
          let deltaY = this.touch[index].y2 - this.touch[index].y1;
          if (Math.abs(deltaX) < 5 || Math.abs(deltaY)) {
            this.$router.push('/my-templet/templet-details?isSys=' + this.templets[index].isSystem + '&code=' + this.templets[index].code + '&xiugai=' + true);
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
      },
      // 从模板点击进入模板详情
      toTempletDetail(m, n) {
        this.$router.push('/my-templet/templet-details?isSys=' + m + '&code=' + n + '&xiugai=' + true);
      },
      nothing() {
      }
    },
    components: {
      Toast
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .home-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .fr{
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
    .templet{
      width: 100%;
      height: 1rem;
      padding-left:0.3rem;
      border-bottom:0.01rem solid #eee;
      background: #fff;
      position: relative;
      .type{
        font-size: 0.3rem;
        color: #484848;
        line-height: 1rem;
      }
      .price{
        font-size: 0.28rem;
        color: $primary-color;
        line-height: 1rem;
        position: absolute;
        right: 0.65rem;
      }
      img{
        width: 0.15rem;
        height: 0.25rem;
        margin: 0.35rem 0.3rem 0 0.2rem;
        position: absolute;
        right: 0;
      }
    }

    .down{
      padding:0.8rem 0.3rem;
      background: transparent;
      button{
        width: 100%;
        height: 0.9rem;
        background: $primary-color;
        border-radius: 0.1rem ;
        span{
          color:#fff;
          font-size: 0.36rem;
        }
      }
    }

  }


</style>
