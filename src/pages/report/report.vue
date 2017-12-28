<template>
  <div class="full-screen-wrapper report-wrapper">
    <scroll ref="scroll" :pullUpLoad="pullUpLoad">
      <sjrz-list :data="sjrzInfo" @reload="refresh"></sjrz-list>
      <zmrz-list :data="zmrzInfo" @reload="refresh"></zmrz-list>
      <jbxx-list :data="jbxxList" :dict="hygzDict" @reload="refresh"></jbxx-list>
      <sfz-list :data="sfzPics" @reload="refresh"></sfz-list>
      <dw-list :data="dwInfo" @reload="refresh"></dw-list>
      <txl-list :data="txlList" @reload="refresh"></txl-list>
      <yys-list :data="yysInfo" @reload="refresh"></yys-list>
      <zmf-list :data="zmfInfo" @reload="refresh"></zmf-list>
      <hygz-list :data="hygzList" @reload="refresh"></hygz-list>
      <qz-list :data="qzList" @reload="refresh"></qz-list>
      <td-list :data="tdInfo" @reload="refresh"></td-list>
      <remark-list :data="remarkList" @reload="refresh"></remark-list>
      <div class="inner-height"></div>
    </scroll>
    <div class="button cd-flexbox">
      <button @click="toTransmit"><span>转发报告</span></button>
      <button @click="showRemark"><span>添加备注</span></button>
    </div>
    <full-loading v-show="loadFlag" :title="loadTip"></full-loading>
    <confirm ref="confirm" :text="remarkTpl" :isHtml="isHtml" @confirm="addRemark"></confirm>
    <toast ref="toast" :text="tip"></toast>
    <router-view></router-view>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import Confirm from 'base/confirm/confirm';
  import Scroll from 'base/scroll/scroll';
  import Toast from 'base/toast/toast';
  import SjrzList from 'components/sjrz-list/sjrz-list';
  import ZmrzList from 'components/zmrz-list/zmrz-list';
  import JbxxList from 'components/jbxx-list/jbxx-list';
  import SfzList from 'components/sfz-list/sfz-list';
  import DwList from 'components/dw-list/dw-list';
  import TxlList from 'components/txl-list/txl-list';
  import YysList from 'components/yys-list/yys-list';
  import ZmfList from 'components/zmf-list/zmf-list';
  import HygzList from 'components/hygz-list/hygz-list';
  import QzList from 'components/qz-list/qz-list';
  import TdList from 'components/td-list/td-list';
  import RemarkList from 'components/remark-list/remark-list';
  import {setTitle} from 'common/js/util';
  import {getReport, addRemark} from 'api/biz';
  import {getDictList} from 'api/general';

  export default {
    data() {
      return {
        loadFlag: true,
        loadTip: '加载中...',
        tip: '',
        sjrzInfo: null,
        zmrzInfo: null,
        jbxxList: null,
        sfzPics: null,
        dwInfo: null,
        txlList: null,
        yysInfo: null,
        zmfInfo: null,
        hygzList: null,
        hygzDict: null,
        qzList: null,
        tdInfo: null,
        remarkList: null
      };
    },
    created() {
      this.isHtml = true;
      this.pullUpLoad = null;
      this.remarkTpl = '<textarea ref="textarea" class="cd-w100" rows="2" placeholder="请输入备注信息"></textarea>';
      setTitle('调查报告');
      Promise.all([
        this.getReport(),
        this.getDictList()
      ]).then(() => {
        this.loadFlag = false;
      }).catch((msg) => {
        if (msg === '报告已过期,不能查看') {
          setTimeout(() => {
            this.$router.back();
          }, 200);
        }
        this.loadFlag = false;
      });
    },
    methods: {
      getReport() {
        let code = this.$route.params.code;
        return getReport(code).then((data) => {
          // 手机认证
          this.sjrzInfo = this.getDataByKey('F1', data);
          // 芝麻认证
          this.zmrzInfo = this.getDataByKey('F2', data);
          // 基本信息
          this.jbxxList = this.getDataByKey('F3', data);
          // 身份证正反面
          this.sfzPics = this.getDataByKey('PID1', data);
          // 强制定位
          this.dwInfo = this.getDataByKey('PDW2', data);
          // 通讯录
          this.txlList = this.getDataByKey('PTXL3', data);
          // 运营商
          this.yysInfo = this.getDataByKey('PYYS4', data);
          // 芝麻分
          this.zmfInfo = this.getDataByKey('PZM5', data);
          // 行业关注清单
          this.hygzList = this.getDataByKey('PZM6', data);
          // 欺诈三接口
          this.qzList = this.getDataByKey('PZM7', data);
          // 同盾
          this.tdInfo = this.getDataByKey('PTD8', data);
          // 备注
          this.remarkList = data['reportRemarkList'];
        });
      },
      getDictList() {
        return getDictList().then((data) => {
          let obj = {
            'education': {},
            'marriage': {},
            'live_time': {},
            'occupation': {},
            'income': {},
            'family_relation': {},
            'society_relation': {}
          };
          data.forEach((item) => {
            switch (item.parentKey) {
              case 'education':
                obj.education[item.dkey] = item.dvalue; break;
              case 'marriage':
                obj.marriage[item.dkey] = item.dvalue; break;
              case 'live_time':
                obj.live_time[item.dkey] = item.dvalue; break;
              case 'occupation':
                obj.occupation[item.dkey] = item.dvalue; break;
              case 'income':
                obj.income[item.dkey] = item.dvalue; break;
              case 'family_relation':
                obj.family_relation[item.dkey] = item.dvalue; break;
              case 'society_relation':
                obj.society_relation[item.dkey] = item.dvalue; break;
              default: break;
            }
          });
          this.hygzDict = obj;
        });
      },
      getDataByKey(key, data) {
        try {
          return data[key] ? JSON.parse(data[key]) : null;
        } catch (e) {
          return null;
        }
      },
      refresh() {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      },
      toTransmit() {
        this.$router.push(this.$route.path + '/transmit');
      },
      showRemark() {
        this.$refs.confirm.show();
        let $textarea = this.$refs.confirm.$el.getElementsByTagName('textarea')[0];
        $textarea.value = '';
        setTimeout(() => {
          $textarea.focus();
        }, 300);
      },
      addRemark() {
        let value = this.$refs.confirm.$el.getElementsByTagName('textarea')[0].value;
        if (value) {
          this.loadTip = '添加中...';
          this.loadFlag = true;
          addRemark(value, this.$route.params.code).then((data) => {
            this.loadFlag = false;
            if (data.isSuccess) {
              this.tip = '备注添加成功';
              this.remarkList = this.remarkList || [];
              this.remarkList.push({
                createDatetime: Date.now(),
                remark: value
              });
            } else {
              this.tip = '备注添加失败';
            }
            this.$refs.toast.show();
          }).catch(() => {
            this.loadFlag = false;
          });
        } else {
          this.tip = '备注不能为空';
          this.$refs.toast.show();
        }
      }
    },
    components: {
      FullLoading,
      Confirm,
      Scroll,
      Toast,
      SjrzList,
      ZmrzList,
      JbxxList,
      SfzList,
      DwList,
      TxlList,
      YysList,
      ZmfList,
      HygzList,
      QzList,
      TdList,
      RemarkList
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .report-wrapper {
    background: $color-background;
    .inner-height {
      height: 1.3rem;
    }
    .button {
      width: 100%;
      padding: 0.2rem 0.3rem;
      position: fixed;
      bottom: 0;
      button {
        width: 100%;
        height: 0.9rem;
        background: $primary-color;
        border-radius: 0.1rem ;
        margin-right: 0.15rem;
        &+button {
          margin-right: 0;
          margin-left: 0.15rem;
        }
        span {
          color: #fff;
          font-size: $font-size-large-s;
        }
      }
    }
    .split-bar {
      padding: 0 0.3rem;
      line-height: 0.8rem;
      font-size: $font-size-medium;
      background: $primary-color;
      color: #fff;
      @include border-bottom-1px(#fff);
    }
  }
</style>
