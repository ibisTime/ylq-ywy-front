import * as types from './mutation-types';

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_USER_MOBILE](state, mobile) {
    state.user.mobile = mobile;
  },
  [types.SET_USER_NICKNAME](state, nickname) {
    state.user.nickname = nickname;
  },
  [types.SET_USER_AVATAR](state, photo) {
    state.user.photo = photo;
  }
};

export default mutations;
