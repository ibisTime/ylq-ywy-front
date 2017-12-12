import {formatAvatar} from 'common/js/util';

const GENDER = {
  '0': '女',
  '1': '男'
};

export default class User {
  constructor({ userId, gender, level, mobile, nickname, photo }) {
    this.userId = userId;
    this.gender = gender;
    this.level = level;
    this.mobile = mobile;
    this.nickname = nickname;
    this.photo = formatAvatar(photo);
  }
  setAvatar(photo) {
    this.photo = formatAvatar(photo);
  }
}
