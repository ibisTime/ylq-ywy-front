<template>
    <div class="full-screen-wrapper setting-wrapper">
      <header>
        <div class="cd-flexbox cd-align-center">
          <div class="setting-item border-bottom-1px">
            <img :src="getAvatar()"/>
            <qiniu
              ref="qiniu"
              style="visibility: hidden;position: absolute;"
              :token="token"
              :uploadUrl="uploadUrl"></qiniu>
            <input class="input-file"
                   type="file"
                   :multiple="multiple"
                   ref="fileInput"
                   @change="fileChange"
                   accept="image/*"/>
          </div>
          <div class="cd-flex1">
            <p>{{user && user.nickname}}</p>
            <p>{{user && user.mobile}}</p>
          </div>
        </div>
      </header>
      <div class="main-cont">
        <router-link tag="div" to="/user/setting/change-nickname" class="line-item border-bottom-1px">
          修改昵称<i class="right-arrow-gray"></i>
        </router-link>
        <router-link tag="div" to="/user/setting/change-valid" class="line-item border-bottom-1px">
          修改手机号<i class="right-arrow-gray"></i>
        </router-link>
        <router-link tag="div" to="/user/setting/change-pwd" class="line-item border-bottom-1px">
          修改登录密码<i class="right-arrow-gray"></i>
        </router-link>
        <div class="line-item border-bottom-1px">
          实名认证<i class="right-arrow-gray"></i>
        </div>
        <router-link tag="div" to="/user/setting/about-us" class="line-item border-bottom-1px">
          关于我们<i class="right-arrow-gray"></i>
        </router-link>
      </div>
      <div class="service">
        <span>{{serviceTime.remark}}:{{serviceTime.cvalue}}</span><br>
        <span>{{serviceTel.remark}}:{{serviceTel.cvalue}}</span>
      </div>
      <div class="button-wrapper" @click="logout">
        <button>退出登录</button>
      </div>
      <clip-img @choseImage="updateImg"
                @cancel="handleCancel"
                ref="clipImg"
                :imgType="imgType"
                :imgUrl="imgUrl"></clip-img>
      <router-view ></router-view>
    </div>
</template>
<script>
  import Qiniu from 'base/qiniu/qiniu';
  import EXIF from 'exif-js';
  import ClipImg from 'base/clip-img/clip-img';
  import {SET_USER, SET_USER_AVATAR} from 'store/mutation-types';
  import {setTitle, clearUser, formatAvatar, getImgData} from 'common/js/util';
  import {getUser, changeAvatar} from 'api/user';
  import {getQiniuToken, getServiceTime, getServiceTel} from 'api/general';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        token: '',
        imgType: '',
        imgUrl: '',
        preview: '',
        serviceTime: '',
        serviceTel: ''
      };
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      this.uploadUrl = 'http://upload-na0.qiniu.com';
      this.multiple = false;
      if (this.shouldGetData()) {
        this._getUser();
        this.getService();
      }
    },
    methods: {
      shouldGetData() {
        if (/\/user\/setting$/.test(this.$route.path)) {
          setTitle('设置');
          return !this.token;
        }
        return false;
      },
      _getUser() {
        Promise.all([
          this.getUser(),
          this.getQiniuToken()
        ]).then(() => {
          this.loadingFlag = false;
        }).catch(() => {});
      },
      getUser() {
        if (this.user) {
          return Promise.resolve(this.user);
        }
        return getUser().then((data) => {
          this.setUser(data);
        });
      },
      getService() {
        getServiceTime('time').then((data) => {
          this.serviceTime = data;
          getServiceTel('telephone').then((data) => {
            this.serviceTel = data;
          });
        });
      },
      logout() {
        clearUser();
        this.$router.push('/login');
      },
      getAvatar() {
        if (!this.user) {
          return require('./avatar.png');
        }
        return formatAvatar(this.preview || this.user.photo);
      },
      getQiniuToken() {
        return getQiniuToken().then((data) => {
          this.token = data.uploadToken;
        });
      },
      /**
       * 从相册中选择图片
       * */
      fileChange(e) {
        this.title = '上传中...';
        this.loadingFlag = true;
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        files = Array.prototype.slice.call(files, 0, 1);
        let self = this;
        let file = files[0];
        let orientation;
        EXIF.getData(file, function() {
          orientation = EXIF.getTag(this, 'Orientation');
        });
        let reader = new FileReader();
        reader.onload = function(e) {
          getImgData(file.type, this.result, orientation, function(data) {
            let _url = URL.createObjectURL(file);
            let key = _url.split('/').pop() + '.' + file.name.split('.').pop();
            self.imgType = file.type;
            self.imgUrl = data;
            self.imgKey = key;
            self.$refs.clipImg.show();
            self.$refs.fileInput.value = null;
          });
        };
        reader.readAsDataURL(file);
      },

      /**
       * 处理图片上传错误事件
       * @param error 错误信息
       */
      onUploadError(error) {
        this.text = error.body && error.body.error || '图片上传出错';
        this.$refs.toast.show();
      },
      updateImg(base64) {
        this.preview = base64;
        this.$refs.qiniu.uploadByBase64(base64, this.imgKey).then(() => {
          this.editAvatar();
        }).catch((err) => {
          this.preview = '';
          this.onUploadError(err);
        });
      },
      handleCancel() {
        this.loadingFlag = false;
      },
      editAvatar() {
        changeAvatar(this.imgKey).then(() => {
          this.loadingFlag = false;
          this.setAvatar(this.imgKey);
        }).catch(() => {
          this.preview = '';
          this.loadingFlag = false;
        });
      },
      ...mapMutations({
        setAvatar: SET_USER_AVATAR,
        setUser: SET_USER
      })
    },
    components: {
      Qiniu,
      ClipImg
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .setting-wrapper {
    background-color: $color-background;
    header {
      padding: 0.4rem 0.3rem;
      font-size: $font-size-medium-x;
      background-color: #fff;
      .user-avatar {
        width: 1rem;
        height: 1rem;
        flex: 0 0 1rem;
        margin-right: 0.2rem;
      }
      .cd-flex1 {
        p+p {
          padding-top: 0.2rem;
        }
      }
    }
    .main-cont {
      margin-top: 0.2rem;
      padding-left: 0.3rem;
      font-size: $font-size-medium-x;
      background-color: #fff;
      i{
        position: absolute;
        right: 0.3rem;
      }
    }
    .line-item {
      padding-right: 0.3rem;
      line-height: 1rem;
      @include border-bottom-1px($color-border);
      &:last-child {
        @include border-none();
      }
    }
    .right-arrow-gray {
      float: right;
      height: 1rem;
      width: 0.16rem;
      @include bg-image('more-gray');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.16rem;
    }
    .setting-item {
      position: relative;
      height: 1.16rem;
      width: 0.92rem;
      line-height: 1.16rem;
      padding-left: 0.3rem;
      margin-right: 0.2rem;
      @include border-bottom-1px($color-border);

      h2 {
        font-size: $font-size-medium-x;
      }


      img {
        position: absolute;
        right: 0.002rem;
        width: 0.92rem;
        height: 0.92rem;
        top: 0.12rem;
        border-radius: 50%;
      }

      span {
        position: absolute;
        right: 0.8rem;
        left: 2rem;
        top: 50%;
        transform: translate(0, -50%);
        overflow: hidden;
        white-space: nowrap;
        text-align: right;
        text-overflow: ellipsis;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }

      .input-file {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.92rem;
        height: 0.92rem;
        opacity: 0;
      }
    }
    .button-wrapper {
      margin-top: 0.7rem;
      padding: 0 0.3rem;
      button {
        width: 100%;
        line-height: 0.88rem;
        border-radius: 0.1rem;
        font-size: $font-size-large-s;
        color: #fff;
        background-color: $primary-color;
      }
    }
    .service{
      margin-top: 0.5rem;
      width: 100%;
      height: 1rem;
      text-align: center;
      span{
        line-height: 0.5rem;
        font-size: 0.28rem;
      }
    }
  }
</style>
