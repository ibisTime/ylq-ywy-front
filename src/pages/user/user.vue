<template>
    <div class="full-screen-wrapper user-wrapper">
      <header>
        <div class="cd-flexbox cd-align-center">
          <div class="cd-avatar-box user-avatar"><img src="./avatar.png"></div>
          <div class="cd-flex1 user-message">
            <p>某某</p>
            <p>15555555555</p>
          </div>
          <div class="right-arrow"></div>
        </div>
      </header>
      <div class="main-cont cd-bg-fff">
        <div class="line-item cd-flexbox cd-align-center">
          <div class="icon-money"></div>
          <div class="price cd-flex1"><label>橙券</label>6444.13</div>
          <div class="right-arrow right-arrow-gray"></div>
        </div>
        <div class="line-item cd-flexbox cd-align-center">
          <div class="icon-bill"></div>
          <div class="price cd-flex1"><label>账单</label></div>
          <div class="right-arrow right-arrow-gray"></div>
        </div>
        <div class="bill-flow">
          <div class="bill-item"></div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {};
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .user-wrapper {
    header {
      padding: 0.45rem 0.3rem;
      background-color: $primary-color;
    }
    .user-avatar {
      width: 1.1rem;
      height: 1.1rem;
    }
    .user-message {
      margin-left: 0.2rem;
      font-size: $font-size-large-ss;
      color: #fff;
      p+p {
        margin-top: 0.2rem;
        font-size: $font-size-medium-x;
      }
    }
    .right-arrow {
      height: 1.1rem;
      width: 0.16rem;
      @include bg-image('more');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.16rem;

      &.right-arrow-gray {
        height: 100%;
        @include bg-image('more');
      }
    }

    .main-cont {
      padding: 0 0.3rem;
    }
    .line-item {
      height: 1rem;
      .icon-money {
        height: 100%;
        width: 0.28rem;
        @include bg-image('money');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.28rem;
      }
      .icon-bill {
        height: 100%;
        width: 0.28rem;
        @include bg-image('bill');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.28rem;
      }
      .price {
        margin-left: 0.2rem;
        font-size: $font-size-medium;
        label {
          padding-right: 0.3rem;
          font-size: $font-size-medium-x;
        }
      }
    }
  }
</style>
