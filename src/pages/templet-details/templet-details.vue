<template>
  <div class="full-screen-wrapper templet-detail-wrapper">
    <scroll :pullUpLoad="pullUpLoad" ref="scroll">
      <div class='templet' @click="toChangeName(templetName)">
        <span class="type">模板名称</span>
        <img src="./more-gray@2x.png" class="fr" :class="{vh:!showSave}">
        <span class="status fr">{{templetName}}</span>
      </div>
      <div class='templet' v-if="!moren">
        <span class="type">是否默认</span>
        <img src="./more-gray@2x.png" class="fr vh" >
        <switch-option ref="switch" class="fr" style="position:relative;right: -5.8rem;
    bottom: 0.3rem;" :value="open" @update:value="open1">
        </switch-option>
      </div>
      <div class='openInterfaceTip'>
        <span class="type">使用的接口</span>
      </div>
      <div class="interfaces">
        <div class="interface" >
          <img src="./手机认证@2x.png" class="littleIcon">
          <span class="type">手机认证</span>
          <img src="./more-gray@2x.png" class="fr vh">
          <span class="status fr">使用中</span>
        </div>
        <div class="interface">
          <img src="./芝麻认证@2x.png" class="littleIcon">
          <span class="type">芝麻认证</span>
          <img src="./more-gray@2x.png" class="fr vh">
          <span class="status fr">使用中</span>
        </div>
        <div class="interface" >
          <img src="./基本信息@2x.png" class="littleIcon">
          <span class="type">基本信息</span>
          <img src="./more-gray@2x.png" class="fr vh">
          <span class="status fr">使用中</span>
        </div>
        <div class="interface"
             v-model="item.status"
             v-for="item in interface"
             @click="toInterfaceDetail(item.name,item.status)"
             v-if="(item.status || showSave)">
          <img :src="item.src" class="littleIcon">
          <span class="type">{{item.text}}</span>
          <img src="./more-gray@2x.png" class="fr" :class="{vh:!showSave}">
          <span class="status fr" v-if="item.status">使用中</span>
        </div>
      </div>
      <div class="text">
        <span>目前报告价格为<span>{{totalPrice | formatAmount}}</span>元</span>
      </div>
      <div class="down">
        <div class="two">
          <button v-if="showSend" @click="$router.push('/my-templet/templet-details/send-to-client?code='+templetCode)"><span>发送客户</span></button>
          <button v-if="showSave" class="needsclick" @click="save"><span>保存</span></button>
        </div>
      </div>
    </scroll>
    <toast ref="toast" :text="toastText" :delay="delay"></toast>
    <full-loading v-show="loadingFlag" text="保存中..."></full-loading>
    <router-view @changeTemplet="changeTemplet" @changeName="changeName"></router-view>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  import SwitchOption from 'base/switch-option/switch-option';
  import Toast from 'base/toast/toast';
  import Loading from 'base/loading/loading';
  import {setTitle} from 'common/js/util';
  import {queryTempletDetail, queryMoren, addTemplet, editIsDefault, editTemplet, getInterface} from 'api/biz';
  import {commonMixin} from 'common/js/mixin';
  export default {
    mixins: [commonMixin],
    data () {
      return {
        loadingFlag: false,
        interfaces: [],
        interface: [
          {
            // 1.身份证正反面
            name: 'PID1',
            status: false,
            text: '身份证正反面',
            src: require('./身份证@2x.png')
          }, {
            // 2.强制定位
            name: 'PDW2',
            status: false,
            text: '强制定位',
            src: require('./定位@2x.png')
          }, {
            // 3.通讯录认证
            name: 'PTXL3',
            stats: false,
            text: '通讯录认证',
            src: require('./通讯录@2x.png')
          }, {
            // 4.运营商认证
            name: 'PYYS4',
            status: false,
            text: '运营商认证',
            src: require('./运营商@2x.png')
          }, {
            // 5.芝麻信用认证
            name: 'PZM5',
            status: false,
            text: '芝麻信用认证',
            src: require('./芝麻分@2x.png')
          }, {
            // 6.行业关注清单认证
            name: 'PZM6',
            status: false,
            text: '行业关注清单认证',
            src: require('./行业关注名单@2x.png')
          }, {
            // 7.欺诈三接口认证
            name: 'PZM7',
            status: false,
            text: '欺诈三接口认证',
            src: require('./欺诈认证@2x.png')
          }, {
            // 8.同盾认证
            name: 'PTD8',
            status: null,
            text: '同盾认证',
            src: require('./同盾@2x.png')
          }
        ],
        templetName: '我的模板',
        totalPrice: '',
        open: false,
        templetCode: '',
        isSys: '',
        moren: '',
        toastText: '',
        delay: 1500
      };
    },
    computed: {
      showSend() {
        return this.templetCode;
      },
      showSave() {
        return this.isSys === '0' || (!this.moren && !this.templetCode);
      }
    },
    created() {
      this.first = true;
      this.pullUpLoad = null;
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/my-templet/templet-details') {
          if (this.templetCode || this.moren) {
            setTitle('模板详情');
          } else {
            setTitle('创建模板');
          }
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          this.createMethod().then(() => {
            this.loadingFlag = false;
            setTimeout(() => {
              this.$refs.scroll.refresh();
            }, 40);
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      // 去接口的启用与停用页面，传递接口名与使用情况
      toInterfaceDetail(code, status) {
        if (this.showSave) {
          this.$router.push('/my-templet/templet-details/interface-details?code=' + code + '&status=' + status);
        }
      },
      // 去修改模板名称页面，传递当前模板名称
      toChangeName(name) {
        if (this.showSave) {
          this.$router.push('/my-templet/templet-details/change-templetname?name=' + name);
        }
      },
      // 接口的启用与停用
      changeTemplet(n) {
        this.code = n.code || '';
        this.totalPrice = (+this.totalPrice) + n.price + '';
        for (let v of this.interface) {
          if (v.name === this.code) {
            v.status = n.status || false;
          }
        }
      },
      // 修改模板名称
      changeName(n) {
        this.templetName = n.name;
      },
      save() {
        this.templetCode ? this.edit() : this.addTemplet();
      },
      addTemplet() {
        this.loadingFlag = true;
        this.getOpenInterface();
        addTemplet(this.open ? '1' : '0', this.templetName, this.openInterface).then((data) => {
          this.loadingFlag = false;
          this.showMsg('创建成功!', 500);
          setTimeout(() => {
            this.$router.back();
          }, 500);
          this.$emit('addTemplet');
        }).catch(() => {
          this.loadingFlag = false;
        });
      },
      // 修改是否默认时触发的事件
      open1(val) {
        if (this.open !== val) {
          this.open = val;
          if (!this.moren && val) {
            this.editDefault();
          } else {
            this.showMsg('不可取消默认模板！您可以将其他模板设置为默认模板', 2000);
            this.open = true;
            setTimeout(() => {
              this.$refs.switch.clickSwitch();
            }, 300);
          }
        }
      },
      // 修改模板
      edit() {
        this.loadingFlag = true;
        this.getOpenInterface();
        editTemplet(this.templetCode, this.templetName, this.openInterface).then(() => {
          this.loadingFlag = false;
          this.showMsg('修改成功!');
          setTimeout(() => {
            this.$router.back();
          }, 500);
          this.$emit('editTemplet');
        }).catch(() => {
          this.loadingFlag = false;
        });
      },
      // 修改默认模板
      editDefault() {
        if(this.templetCode) {
          editIsDefault(this.templetCode).then(() => {
            this.showMsg('修改成功!');
          });
        }
      },
      // 获取打开的接口
      getOpenInterface() {
        this.openInterface = '';
        for (let v of this.interface) {
          if (v.status) {
            this.openInterface += v.name + ',';
          }
        }
        if (this.openInterface) {
          this.openInterface = 'F1,F2,F3,' + this.openInterface;
          this.openInterface = this.openInterface.substring(0, this.openInterface.length - 1);
        } else {
          this.openInterface = 'F1,F2,F3' + this.openInterface;
        }
      },
      // 调用查询默认模板的接口
      morenTemplet() {
        return queryMoren().then((data) => {
          this.templetCode = data.code;
          this.initParams(data);
        });
      },
      // 从用户模板点进去查询用户模板
      userTemplet() {
        return queryTempletDetail(this.templetCode).then((data) => {
          this.initParams(data);
        });
      },
      initParams(data) {
        if (data.isDefault === '1') {
          this.open = true;
          this.moren = true;
        } else {
          this.open = false;
          this.moren = false;
        }
        this.isSys = data.isSystem;
        this.templetName = data.name;
        this.interfaces = data.portList;
        this.totalPrice = data.totalPrice;
        for (let v of this.interface) {
          if (this.interfaces.indexOf(v.name) !== -1) {
            v.status = true;
          }
        }
      },
      createMethod() {
        this.moren = this.$route.query.moren || '';
        this.templetCode = this.$route.query.code || '';
        if (this.templetCode) {
          return this.userTemplet();
        }
        if (this.moren) {
          return this.morenTemplet();
        }
        getInterface().then((data) => {
          for(let v of data.list) {
            if(v.code === 'F1' || v.code === 'F2' || v.code === 'F3') {
              this.totalPrice = (+this.totalPrice) + v.price;
            }
          }
        });
        return Promise.resolve();
      },
      showMsg(msg, delay) {
        this.toastText = msg;
        this.delay = delay || 1500;
        this.$refs.toast.show();
      }
    },
    components: {
      Scroll,
      FullLoading,
      SwitchOption,
      Toast,
      Loading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .templet-detail-wrapper {
    background: $color-background;
    .fr {
      float: right;
    }
    .vh {
      visibility: hidden;
    }
    .templet {
      width: 100%;
      height: 1rem;
      padding: 0.35rem 0.3rem;
      border-bottom:0.01rem solid #eee;
      background: #fff;
      .type {
        font-size: 0.3rem;
        color: #484848;
      }
      .price {
        font-size: 0.28rem;
        color: $primary-color;
      }
      img {
        width: 0.15rem;
        margin-left: 0.2rem;
      }
      .status {
        font-size: 0.24rem;
        color: #484848;
        margin-top: 0.05rem;
      }
    }
    .openInterfaceTip {
        height: 0.6rem;
        padding-top: 0.23rem;
        background: rgb(245,245,245);
        padding-left: 0.3rem;
        .type{
          font-size: 0.24rem;
          color: #999;
        }
    }
    .interfaces {
      background: #fff;
      .interface {
        padding:0.35rem 0.3rem 0.35rem 0.4rem;
        border-bottom:0.01rem solid #eee;
        .littleIcon {
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.2rem;
          margin-left:0;
          margin-top: 0.05rem;
        }
        .type {
          font-size: 0.3rem;
          color: #484848;
        }
        img {
          width: 0.15rem;
          margin-left: 0.26rem;
          margin-top: 0.03rem;
        }
        .status {
          font-size: 0.24rem;
          color: #484848;
          margin-top: 0.05rem;
        }
      }
    }
    .text {
      padding-top: 0.6rem;
      text-align: center;
      padding-bottom: 1.4rem;
      background: $color-background;
      span {
        color: #484848;
        font-size: 0.28rem;
        span {
          color: $primary-color;
          font-size: 0.36rem;
        }
      }
    }
    .down {
      padding:0 0.3rem;
      background: $color-background;
      padding-bottom: 1.2rem;
      .two {
        display: flex;
        button {
          border-radius: 0.1rem;
          flex: 1;
          height: 0.9rem;
          font-size: 0.36rem;
          color: #fff;
          background: $primary-color;
          &+button {
            margin-left: 2%;
          }
          span {
            color:#fff;
            font-size: 0.36rem;
          }
        }
      }
    }
  }


</style>
