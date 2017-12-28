<template>
  <div id="app" @touchmove.prevent>
    <div v-if="!loadingFlag">
      <router-view></router-view>
    </div>
    <div v-if="loadingFlag" class="loading-container">
      <div class="loading-wrapper">
        <loading title=""></loading>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading';
  import {isLogin} from 'common/js/util';

  export default {
    data() {
      return {
        loadingFlag: false,
        text: ''
      };
    },
    created() {
      if (!isLogin() && location.pathname !== '/find-pwd' &&
        location.pathname !== '/login' && location.pathname !== '/register' &&
        location.pathname !== '/download') {
        this.$router.replace('/login');
      } else {
        this.loadingFlag = false;
      }
    },
    methods: {
    },
    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .loading-wrapper {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate3d(0, -50%, 0);
    }
  }
</style>
