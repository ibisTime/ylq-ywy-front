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
    isDefault: isDefault,
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

/*
* 查询用户
 */

export function queryUser() {
  return fetch(805121, {
    userId: getUserId()
  });
}

/**
 * 分页查询客户
 * @param {string} start
 * @param {string} limit
 */
export function getPageCustomers(start, limit) {
  return fetch(805350, {
    start,
    limit,
    salesUser: getUserId()
  });
}
/**
 * 详情查询报告单
 * @param {string} reportCode
 */
export function getReport(reportCode) {
  return fetch(805331, {reportCode});
}
/***
 *
 * @param templetCode
 */

export function delTemplet(templetCode) {
  return fetch(805231, {
    code: templetCode
  });
}
