<template>
  <div class="full-screen-wrapper interface-detail-wrapper">
    <div class="scroll-wrapper" style="height: 90%;">
      <scroll ref="scroll" :data="detailsArr" :pullUpLoad="pullUpLoad">
      <div class="form-wrapper">
        <div class="form-item">
          <div class="item-label">编号</div>
          <div class="item-input-wrapper">
            {{details.code}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">账号</div>
          <div class="item-input-wrapper">
            {{details.accountNumber}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">付款户名</div>
          <div class="item-input-wrapper">
            {{details.payAccountName}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">金额</div>
          <div class="item-input-wrapper">
            {{details.amount | formatAmount}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">币种</div>
          <div class="item-input-wrapper">
            {{details.currency}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">业务类型</div>
          <div class="item-input-wrapper">
            {{details.bizType}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">状态</div>
          <div class="item-input-wrapper">
            {{details.status}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">申请人</div>
          <div class="item-input-wrapper">
            {{details.applyUser}}
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">申请时间</div>
          <div class="item-input-wrapper">
            {{details.applyDatetime | formatDate('yyyy-MM-dd hh:mm:ss')}}
          </div>
        </div>
        <div class="form-item" v-if="details.payUser">
          <div class="item-label">审核人</div>
          <div class="item-input-wrapper">
            {{details.payUser}}
          </div>
        </div>
        <div class="form-item" v-if="details.payDatetime">
          <div class="item-label">审核时间</div>
          <div class="item-input-wrapper">
            {{details.payDatetime | formatDate('yyyy-MM-dd hh:mm:ss')}}
          </div>
        </div>
        <div class="form-item" v-if="showCheck">
          <div class="item-label">支付说明</div>
          <div class="item-input-wrapper">
            <input type="text" class="item-input" name="payNote" v-model="payNote"  v-validate="'required'" placeholder="（必填）" v-if="!showNote">
            <span v-if="showNote">{{details.payNote}}</span>
          </div>
        </div>
        <toast ref="toast" :text="toastText"></toast>
        <full-loading v-show="loadFlag" title="修改中..."></full-loading>
      </div>
      </scroll>
    </div>
  </div>
</template>
<script>
  import {setTitle} from 'common/js/util';
  import {check, getOrderDetail} from 'api/biz';
  import {getDictList} from 'api/general';
  import {commonMixin} from 'common/js/mixin';
  import Toast from 'base/toast/toast';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        loadFlag: false,
        name: null,
        status: null,
        description: '',
        price: '',
        payNote: '',
        arr: [],
        code: '',
        details: {},
        detailsArr: [],
        pullUpLoad: null,
        toastText: ''
      };
    },
    computed: {
      showCheck() {
        return this.details.status === '待处理' ? 0 : 1;
      },
      showNote() {
        return this.details.payNote !== undefined ? 1 : 0;
      }
    },
    created() {
      setTitle('审核');
      // 将数据放在当前组件的数据内
      this.code = this.$route.query.code;
      this.arr.push(this.code);
      this.status = this.$route.query.status === 'true';
      this.getOrderDetail();
    },
    methods: {
      getDictList() {
        getDictList('biz_type').then((data) => {
          for(let v of data) {
            if(v.dkey === this.details.bizType) {
              this.details.bizType = v.dvalue;
            }
          }
        });
        getDictList('currency').then((data) => {
          for(let v of data) {
            if(v.dkey === this.details.currency) {
              this.details.currency = v.dvalue;
            }
          }
        });
        getDictList('channel_type').then((data) => {
          for(let v of data) {
            if(v.dkey === this.details.channelType) {
              this.details.channelType = v.dvalue;
            }
          }
        });
        getDictList('charge_status').then((data) => {
          for(let v of data) {
            if(v.dkey === this.details.status) {
              this.details.status = v.dvalue;
            }
          }
        });
      },
      check(status) {
        this.payResult = status ? 1 : 0;
        if(this.payNote !== '') {
          check(this.arr, this.payResult, this.payNote).then(() => {
            this.toastText = '已审核';
            this.$refs.toast.show();
            this.$emit('checkResult', {status: status, code: this.details.code});
            setTimeout(() => {
              this.$router.back();
            }, 500);
          });
        } else {
          this.toastText = '必须填写支付说明';
          this.$refs.toast.show();
        }
      },
      getOrderDetail() {
        getOrderDetail(this.code).then((data) => {
          this.details = data;
          this.detailsArr.push(this.details);
          if (data.user.kind === 'P') {
            this.details.applyUser = data.user.loginName;
          } else {
            this.details.applyUser = data.user.mobile;
          }
          this.getDictList();
        });
      }
    },
    components: {
      Scroll,
      Toast,
      FullLoading
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .interface-detail-wrapper {
    background-color: $color-background;
    .fr {
      float: right;
    }
    .color1 {
      background: $primary-color;
    }
    .color2 {
      background: #ffae00;
    }
    .buttons {
      width: 100%;
      height: 1.3rem;
      position: fixed;
      bottom: 0;
      padding:0.2rem;
      background: #fff;
      button {
        border-radius: 0.1rem;
        width: 48%;
        height: 0.9rem;
        font-size: 0.36rem;
        color: #fff;
      }
      .start {
        margin-right: 2%;
      }
    }
    .about-content{
      height: 90%;
      .rich-text-description{
        padding: 0;
        margin: 0;
        .content{
          width: 100%;
          padding: 0.3rem;
        }
      }
    }


  }


</style>
