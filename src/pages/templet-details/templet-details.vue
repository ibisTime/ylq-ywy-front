<template>
  <div class="home-wrapper">
    <scroll :hasMore="hasMore" :data="interface" :pullUpLoad="pullUpLoad">
      <div class='templet' @click="changeFlag?toChangeName(templetName):nothing()">
        <span class="type">模板名称</span>
        <img src="./more-gray@2x.png" alt="" class="fr" :class="{vh:!changeFlag}">
        <span class="status fr">{{templetName}}</span>
      </div>
      <div class='templet' v-if="!moren">
        <span class="type">是否默认</span>
        <img src="./more-gray@2x.png" alt="" class="fr vh" >
        <switch-option ref="switch" class="fr" style="position:relative;right: -5.8rem;
    bottom: 0.3rem;" :value="open" @update:value="open1" v-if="changeFlag || isSys === '1'">
        </switch-option>
        <span class="status fr" v-if="moren">{{default1}}</span>
      </div>
      <div class='openInterfaceTip'>
        <span class="type">使用的接口</span>
      </div>
      <div class="interfaces">
        <div class="interface" >
          <img src="./手机认证@2x.png" alt="" class="littleIcon">
          <span class="type">手机认证</span>
          <img src="./more-gray@2x.png" alt="" class="fr vh">
          <span class="status fr">使用中</span>
        </div>
        <div class="interface">
          <img src="./芝麻认证@2x.png" alt="" class="littleIcon">
          <span class="type">芝麻认证</span>
          <img src="./more-gray@2x.png" alt="" class="fr vh">
          <span class="status fr">使用中</span>

        </div>
        <div class="interface" >
          <img src="./基本信息@2x.png" alt="" class="littleIcon">
          <span class="type">基本信息</span>
          <img src="./more-gray@2x.png" alt="" class="fr vh">
          <span class="status fr">使用中</span>
        </div>
        <div class="interface" v-model="item.status" v-for="item in interface"
             @click="changeFlag?toInterfaceDetail(item.name,item.status):nothing()"
        v-if="(item.status || changeFlag) ">
          <img :src=item.src alt="" class="littleIcon">
          <span class="type">{{item.text}}</span>
          <img src="./more-gray@2x.png" alt="" class="fr" :class="{vh:!changeFlag}">
          <span class="status fr" v-if="item.status">使用中</span>

        </div>
      </div>
      <div class="text">
        <span>目前报告价格为<span>{{totalPrice | formatAmount}}</span>元</span>
      </div>
      <div class="down">
        <div v-if="isSys!=='0'" class="one">
        <!--<button v-if="!changeFlag " @click="$router.push({name:'send-to-client',params:{code:templetCode}})"><span>发送客户</span></button>-->
        <button v-if="!changeFlag" @click="$router.push('/my-templet/templet-details/send-to-client?code='+templetCode)"><span>发送客户</span></button>
        <button v-if="changeFlag " @click="xiugai?edit():addTemplet()"><span>保存</span></button>
        </div>
        <div v-if="isSys==='0'" class="two">
        <!--<button @click="$router.push({name:'send-to-client',params:{code:templetCode}})" ><span>发送客户</span></button>-->
        <button @click="$router.push('/my-templet/templet-details/send-to-client?code='+templetCode)" ><span>发送客户</span></button>
        <button @click="edit()"><span>保存</span></button>
        </div>
      </div>
    </scroll>
    <toast ref="toast" text="修改成功!"></toast>
    <toast ref="toast1" text="创建成功!"></toast>
    <toast ref="toast2" text="不可取消默认模板！您可以将其他模板设置为默认模板"></toast>
    <router-view @changeTemplet="changeTemplet" @changeName="changeName"></router-view>

  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll';
  import SwitchOption from 'base/switch-option/switch-option';
  import Toast from 'base/toast/toast';
  import {setTitle} from 'common/js/util';
  import {queryTempletDetail, queryMoren, addTemplet, editIsDefault, editTemplet} from 'api/biz';
  import {commonMixin} from 'common/js/mixin';
  export default {
    mixins: [commonMixin],
    data () {
      return {
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
        // name用来接收接口详情返回的接口名称
        name: null,
        //  status用来接收接口详情返回的接口状态
        status: null,
        // 模板名称
        templetName: '模板一',
        // 从哪里进来的模板详情页面，创建模板则为true，意为可修改
        changeFlag: null,
        hasMore: false,
        pullUpLoad: null,
        // 从模板点进来的时候的名字
        name1: '',
        portList: '',
        // 自己选择的默认开关
        isDefault: '0',
        // 一开始点进来的时候的默认开关
        default2: '',
        totalPrice: '21000',
        open: '',
        // 创建模板时所有启用的接口
        openInterface: '',
        // 获取的是否默认，展示出来为是/否
        default1: '',
        xiugai: '',
        xiugaiportList: '',
        templetCode: '',
        isSys: ''
      };
    },
    created() {
      this.first = true;
      this.getInitData();
    },
    updated() {
      this.getInitData();
    },
    methods: {
      shouldGetData() {
        if (this.$route.path === '/my-templet/templet-details') {
          if (this.changeFlag) {
            setTitle('创建模板');
          } else {
            setTitle('模板详情');
          }
          return this.first;
        }
        return false;
      },
      getInitData() {
        if (this.shouldGetData()) {
          this.first = false;
          this.loadingFlag = true;
          Promise.all([
            this.createMethod()
          ]).then(() => {
            this.loadingFlag = false;
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      // 去接口的启用与停用页面，传递接口名与使用情况
      toInterfaceDetail(n, m) {
//        this.$router.push({name: 'interface-details', params: {code: n, status: m}});
        this.$router.push('/my-templet/templet-details/interface-details?code=' + n + '&status=' + m);
      },
      // 去修改模板名称页面，传递当前模板名称
      toChangeName(name) {
//        this.$router.push({name: 'change-templetname', params: {name: name}});
        this.$router.push('/my-templet/templet-details/change-templetname?name=' + name);
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
      nothing() {
      },
      addTemplet() {
        this.getOpenInterface();
        addTemplet(this.isDefault, this.templetName, this.openInterface).then((data) => {
          this.$refs.toast1.show();
          setTimeout(() => {
            this.$router.push('/my-templet');
            this.$emit('addTemplet');
          }, 500);
        });
      },
      // 修改是否默认时触发的事件，open1是普通修改变量，点击保存时才真正调用接口去修改模板
      // open2的话是一点击按钮直接调用接口去修改模板
      open1(val) {
          // 情况1.1：默认模板进来，val为false,提示不允许，将open设置为true
        // 情况2.1：非默认的系统模板进来，val为true,设置为默认模板
        if (val) {
          this.isDefault = 1;
          if(this.default2 === '0' && this.isSys === '1') {
            this.editSysTemplet();
          }
        } else {
          this.isDefault = 0;
          if(this.default2 === '1') {
            this.$refs.toast2.show();
            this.$refs.switch.clickSwitch();
          }
        }
      },
      // 修改模板
      edit() {
        this.getOpenInterface();
        if(this.isDefault === 1 && this.default2 === '0') {
          editIsDefault(this.templetCode).then((data) => {
            editTemplet(this.templetCode, this.templetName, this.openInterface).then((data) => {
              this.$refs.toast.show();
              setTimeout(() => {
                this.$router.push('/my-templet');
                this.$emit('editTemplet');
              }, 500);
            });
          });
        }else{
          editTemplet(this.templetCode, this.templetName, this.openInterface).then((data) => {
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/my-templet');
              this.$emit('editTemplet');
            }, 500);
          });
        }
      },
      // 修改默认模板，只能修改是否默认
      editSysTemplet() {
        editIsDefault(this.templetCode).then((data) => {
          this.$refs.toast.show();
        });
      },

      // 获取打开的接口
      getOpenInterface() {
        for (let v of this.interface) {
          if (v.status) {
            this.openInterface += v.name + ',';
          }
        }
        if(this.openInterface) {
          this.openInterface = 'F1,F2,F3,' + this.openInterface;
          this.openInterface = this.openInterface.substring(0, this.openInterface.length - 1);
        }else{
          this.openInterface = 'F1,F2,F3' + this.openInterface;
        }
      },
      // 调用查询默认模板的接口
      morenTemplet() {
        queryMoren().then((data) => {
          this.templetName = data.name;
          this.templetCode = data.code;
          if(data.isDefault === '1') {
            this.default1 = '是';
          }else{
            this.default1 = '否';
          }
          for (let v of this.interface) {
            if (data.portList.indexOf(v.name) !== -1) {
              v.status = true;
            }
          }
          this.totalPrice = data.totalPrice;
        });
      },
      // 从用户模板点进去查询用户模板
      userTemplet() {
        queryTempletDetail(this.templetCode).then((data) => {
          if (data.isDefault === '1') {
            this.open = true;
            this.default2 = true;
          } else {
            this.open = false;
            this.default2 = false;
          }
          this.default2 = data.isDefault;
          this.name1 = data.name;
          this.portList = data.portList;
          this.xiugaiportList = data.portList;
          this.templetName = data.name;
          this.interfaces = data.portList;
          this.totalPrice = data.totalPrice;
          for (let v of this.interface) {
            if (this.interfaces.indexOf(v.name) !== -1) {
              v.status = true;
            }
          }
        });
      },
      // 从系统模板点进去查询系统模板
      sysTemplet() {
        queryTempletDetail(this.templetCode).then((data) => {
          if (data.isDefault === '1') {
            this.open = true;
            this.default2 = true;
          } else {
            this.open = false;
            this.default2 = false;
          }
          this.default2 = data.isDefault;
          this.templetName = data.name;
          this.interfaces = data.portList;
          this.totalPrice = data.totalPrice;
          this.xiugaiportList = data.portList;
          for (let v of this.interface) {
            if (this.interfaces.indexOf(v.name) !== -1) {
              v.status = true;
            }
          }
        });
      },
      createMethod() {
        this.moren = this.$route.query.moren || '';
        this.templetCode = this.$route.query.code || '';
        this.xiugai = this.$route.query.xiugai || '';
        this.isSys = this.$route.query.isSys || '';
        if (this.$route.query.changeFlag) {
          if(this.$route.query.changeFlag === 'true') {
            this.changeFlag = true;
          }else{
            this.changeFlag = false;
          }
        } else {
          // 模板点进来的话
          if (this.isSys === '1') {
            // 1系统模板不可改
            this.changeFlag = false;
            this.sysTemplet();
          } else {
            // 用户模板，可以改
            this.changeFlag = true;
            this.userTemplet();
          }
        }
        if (this.$route.query.moren) {
          // 默认模板发送客户
          this.morenTemplet();
        }
      }
    },
    components: {
      Scroll,
      SwitchOption,
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
    background: $color-background;
    .fr{
      float: right;
    }
    .vh{
      visibility: hidden;
    }
    .templet{
      width: 100%;
      height: 1rem;
      padding: 0.35rem 0.3rem;
      border-bottom:0.01rem solid #eee;
      background: #fff;
      .type{
        font-size: 0.3rem;
        color: #484848;
      }
      .price{
        font-size: 0.28rem;
        color: $primary-color;
      }
      img{
        width: 0.15rem;
        margin-left: 0.2rem;
      }
      .status{
        font-size: 0.24rem;
        color: #484848;
        margin-top: 0.05rem;
      }
    }
    .openInterfaceTip{
        height: 0.6rem;
        padding-top: 0.23rem;
        background: rgb(245,245,245);
        padding-left: 0.3rem;
        .type{
          font-size: 0.24rem;
          color: #999;
        }
    }
    .interfaces{
      background: #fff;
      .interface{
        padding:0.35rem 0.3rem 0.35rem 0.4rem;
        border-bottom:0.01rem solid #eee;
        .littleIcon{
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.2rem;
          margin-left:0;
          margin-top: 0.05rem;
        }
        .type{
          font-size: 0.3rem;
          color: #484848;
        }
        img{
          width: 0.15rem;
          margin-left: 0.26rem;
          margin-top: 0.03rem;
        }
        .status{
          font-size: 0.24rem;
          color: #484848;
          margin-top: 0.05rem;
        }
      }
    }
    .text{
  padding-top: 0.6rem;
  text-align: center;
  padding-bottom: 1.4rem;
  background: $color-background;
  span{
    color: #484848;
    font-size: 0.28rem;
    span{
      color: $primary-color;
      font-size: 0.36rem;
    }
  }
}
    .down{
      padding:0 0.3rem;
      background: $color-background;
      padding-bottom: 1.2rem;
      .one{
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
      .two{
        button{
          border-radius: 0.1rem;
          width: 48%;
          height: 0.9rem;
          font-size: 0.36rem;
          color: #fff;
          background: $primary-color;
          &:nth-child(1){
            margin-right: 2%;
          }
          span{
            color:#fff;
            font-size: 0.36rem;
          }

        }
      }

    }

  }


</style>
