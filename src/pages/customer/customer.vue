<template>
  <div class="full-screen-wrapper report-wrapper">
    <scroll ref="scroll" :pullUpLoad="pullUpLoad" class="scroll">
      <jbxx-list :data="jbxxList" :dict="hygzDict" @reload="refresh"></jbxx-list>
      <!-- <div class="split-bar border-bottom-1px">身份证照片</div>
      <div class="split-bar border-bottom-1px">通讯录认证</div>
      <div class="split-bar border-bottom-1px">运营商认证</div>
      <div class="split-bar border-bottom-1px">芝麻分认证</div> -->
      <hygz-list :data="hygzList" @reload="refresh"></hygz-list>
    </scroll>
    <div class="button">
      <button @click="toTransmit" ><span>转发报告</span></button>
    </div>

    <!-- <div class="split-bar border-bottom-1px">欺诈三接口</div>
    <div class="split-bar border-bottom-1px">同盾认证</div> -->
    <full-loading v-show="loadFlag"></full-loading>
    <router-view></router-view>
  </div>
</template>
<script>
  import FullLoading from 'base/full-loading/full-loading';
  import Scroll from 'base/scroll/scroll';
  import JbxxList from 'components/jbxx-list/jbxx-list';
  import HygzList from 'components/hygz-list/hygz-list';
  import {setTitle} from 'common/js/util';
  import {getReport} from 'api/biz';
  import {getDictList} from 'api/general';
  // import testData from './data';
  export default {
    data() {
      return {
        loadFlag: true,
        jbxxList: null,
        hygzList: null,
        hygzDict: null
      };
    },
    created() {
      this.pullUpLoad = null;
      setTitle('调查报告');
      Promise.all([
        this.getReport(),
        this.getDictList()
      ]).then(() => {
        this.loadFlag = false;
      }).catch(() => {
        this.loadFlag = false;
      });
    },
    methods: {
      getReport() {
        let code = this.$route.params.code;
        return getReport(code).then((data) => {
          let f1 = data['F1'] ? JSON.parse(data['F1']) : {};
          let f2 = data['F2'] ? JSON.parse(data['F2']) : {};
          let f3 = data['F3'] ? JSON.parse(data['F3']) : {};
          this.jbxxList = {
            ...f1,
            ...f2,
            ...f3
          };
          // this.hygzList = testData;
          this.hygzList = data['PZM6'] ? JSON.parse(data['PZM6']) : null;
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
      refresh() {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      },
      toTransmit() {
        this.$router.push(this.$route.path + '/transmit');
      }
    },
    components: {
      Scroll,
      FullLoading,
      JbxxList,
      HygzList
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .report-wrapper {
    background: $color-background;
    .scroll{
      height: 90%;
    }
    .button{
      width: 100%;
      padding: 1rem 0.3rem 0.3rem 0.3rem;
      position: fixed;
      bottom: 0;
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
