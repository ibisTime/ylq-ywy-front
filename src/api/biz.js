/**
 * Created by Administrator on 2017/12/10 0010.
 */
import fetch from 'common/js/fetch';
import {getUserId} from 'common/js/util';
/**
 * 分页查询模板
  */

export function queryTemplet(userId, limit, start) {
  return fetch(805235, {
    userId: getUserId(),
    limit: 10,
    start: 1
  });
}

/*
 * 详情查询模板
 */
export function queryTempletDetail(templetCode) {
  return fetch(805236, {
    code: templetCode
  });
}

/*
*新增模板
*/

export function addTemplet(isDefault, name, portList) {
  return fetch(805230, {
    isDefault: 0,
    userId: getUserId(),
    updater: getUserId(),
    name: name,
    portList: portList
  });
}
/*
*修改模板
 */

export function editTemplet(code, name, portList, updater) {
  return fetch(805232, {
    code: code,
    updater: getUserId(),
    name: name,
    portList: portList
  });
}

/*
*查询接口
 */

export function queryInterface(code) {
  return fetch(805226, {
    code: code
  });
}

/*
* 发送客户
 */

export function sendToClient(captcha, mobile, modelCode) {
  return fetch(805250, {
    captcha: captcha,
    mobile: mobile,
    modelCode: modelCode,
    salesUser: getUserId()
  });
}

/*
* 查询默认模板
 */

export function queryMoren() {
  return fetch(805237, {
    userId: getUserId()
  });
}
