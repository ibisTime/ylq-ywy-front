<template>
  <div class="remark-list-wrapper" v-show="data">
    <split-bar @toggle="toggle" :isHide="isHide" title="备注"></split-bar>
    <div class="list-wrap" ref="listWrap" :class="{hide: isHide}">
      <div v-if="data && !data.length" class="list-item border-bottom-1px">
        <p>暂无备注</p>
      </div>
      <template v-if="data && data.length">
        <div v-for="item in data" class="list-item cd-flexbox border-bottom-1px">
          <div class="desc cd-flex1">{{item.remark}}</div>
          <div class="title">{{item.createDatetime | formatDate('yyyy-MM-dd hh:mm')}}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import SplitBar from 'components/split-bar/split-bar';
  import {commonMixin} from 'common/js/mixin';

  export default {
    mixins: [commonMixin],
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        isHide: false
      };
    },
    methods: {
      toggle() {
        this.isHide = !this.isHide;
        setTimeout(() => {
          this.$emit('reload');
        }, 300);
      }
    },
    watch: {
      data(newData) {
        if (newData) {
          setTimeout(() => {
            this.$refs.listWrap.style.height = 'auto';
            setTimeout(() => {
              this.$refs.listWrap.style.height = this.$refs.listWrap.clientHeight + 'px';
            }, 20);
          }, 40);
          this.$emit('reload');
        }
      }
    },
    components: {
      SplitBar
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .remark-list-wrapper {
    background-color: #fff;
    .list-wrap {
      padding-left: 0.3rem;
      overflow: hidden;
      transition: height 0.3s;
      &.hide {
        height: 0 !important;
      }
      .list-item {
        padding: 0.2rem 0.3rem 0.2rem 0;
        line-height: 0.4rem;
        font-size: $font-size-medium;
        @include border-bottom-1px($color-border);
        &:last-child {
          @include border-none();
        }
        .title {
          flex: 0 0 9.2em;
          text-align: right;
        }
        .desc {
          word-break: break-all;
        }
      }
    }
  }
</style>
