import utils from "./Utils";
import enums from "../enums";
import moment from "moment";

export class LocalStorageUtilsService {
  static maxExpiryDate = new Date(2100, 0, 1, 0, 0, 0);// By Default It will expire on Year 2100
  lsGetObject(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    }
    catch (ex) {
      return new LocalStorageObject(localStorage.getItem(key));
    }
  }

  lsDelete(key) {
    return localStorage.removeItem(key)
  }

  lsGet(key) {
    try {
      let str = localStorage.getItem(key);
      if (!str)
        return null;
      var lsValue = JSON.parse(str);
      if (!lsValue)
        return null;

      var lso = new LocalStorageObject(lsValue.value, lsValue.expireDateTime);
      if (lso.isExpired()) {
        localStorage.removeItem(key);
        return null;
      }

      try {
        return JSON.parse(lso.value);
      }
      catch (ex) {
        return lso.value;
      }
    }
    catch (ex) {
      utils.showAlert(ex.message, enums.ALERT_TYPE.ERROR)
      return localStorage.getItem(key);
    }
  }

  lsSet(key, item, expireDateOrExpireAfterInMinutes = null) {
    var expiryDate = new Date(2100, 0, 1, 0, 0, 0);// By Default It will expire on Year 2100
    if (typeof expireDateOrExpireAfterInMinutes === 'number')
      expiryDate = moment().add(expireDateOrExpireAfterInMinutes, "minute").toDate() //utils.addDateTime(utils.dateInterval.minutes, expireDateOrExpireAfterInMinutes);
    else if (typeof expireDateOrExpireAfterInMinutes === 'object')
      expiryDate = expireDateOrExpireAfterInMinutes;
    else if (typeof expireDateOrExpireAfterInMinutes === 'string') {
      try {
        expiryDate = new Date(expireDateOrExpireAfterInMinutes);
      } catch (ex) { }
    }
    var lso = new LocalStorageObject(item, expiryDate);

    localStorage.setItem(key, lso.toObject());
  }

}

export class LocalStorageObject {
  value;
  expireDateTime;

  constructor(value, expireDateTime = null) {
    this.setValue(value);
    this.setExpiryDateTime(expireDateTime);
  }

  setValue(value) {
    try {
      this.value = JSON.parse(value);
    }
    catch (ex) {
      this.value = value;
    }
  }

  setExpiryDateTime(expireDateTime) {
    this.expireDateTime = expireDateTime || LocalStorageUtilsService.maxExpiryDate;
  }

  isExpired() {
    if (new Date() > new Date(this.expireDateTime))
      return true;
    return false;
  }

  toObject() {
    try {
      return JSON.stringify(this);
    }
    catch (ex) {
      return '';
    }

  }
}

const lsu = new LocalStorageUtilsService()
window.lsu = lsu;
export default lsu;
