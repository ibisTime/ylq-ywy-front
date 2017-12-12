import * as types from './mutation-types';

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_USER_MOBILE](state, mobile) {
    state.user.mobile = mobile;
  }
};

export default mutations;
