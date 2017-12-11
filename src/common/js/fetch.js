import {SYSTEM_CODE} from './config';
import {getCookie} from './cookie';
import Message from 'base/message/message';
import axios from 'axios';
import {clearUser} from 'common/js/util';

const ERR_OK = '0';
const ERR_TIME_OUT = '4';

const message = new Message();

export default function fetch(code, param) {
  const url = '/api';

  const data = {
    systemCode: SYSTEM_CODE,
    companyCode: SYSTEM_CODE,
    token: getCookie('token'),
    ...param
  };

  param = 'code=' + code + '&json=' + encodeURIComponent(JSON.stringify(data));
  return axios.post(url, param, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    res = res.data;
    if (res.errorCode === ERR_TIME_OUT) {
      message.show('登录超时，请重新登录');
      clearUser();
      _reloadPage();
      return Promise.reject('timeout');
    }
    if(res.errorCode !== ERR_OK) {
      if (res.errorInfo) {
        message.show(res.errorInfo.toString());
      } else {
        message.show('操作失败');
      }
      return Promise.reject(res.errorInfo);
    }
    return Promise.resolve(res.data);
  });
}

function _reloadPage() {
  this.$router.push('/login');
}
