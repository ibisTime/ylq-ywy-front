import * as types from './mutation-types';

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_USER_MOBILE](state, mobile) {
    state.user = state.user || {};
    state.user.mobile = mobile;
  },
  [types.SET_USER_NICKNAME](state, nickname) {
    state.user = state.user || {};
    state.user.nickname = nickname;
  },
  [types.SET_USER_AVATAR](state, photo) {
    state.user = state.user || {};
    state.user.photo = photo;
  },
  [types.SET_USER_REALNAME](state, realName, idNo) {
    state.user = state.user || {};
    state.user.realName = realName;
    state.user.idNo = idNo;
  }
};

export default mutations;
