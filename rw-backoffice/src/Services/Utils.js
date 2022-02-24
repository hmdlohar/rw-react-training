import * as moment from "moment";
import { v4 } from "uuid";
import swal from "sweetalert";
import enums from "../enums";
import qs from "querystring";

const xml_special_to_escaped_one_map = {
  "&": "&amp;",
  '"': "&quot;",
  "<": "&lt;",
  ">": "&gt;",
};

const escaped_one_to_xml_special_map = {
  "&amp;": "&",
  "&quot;": "",
  "&lt;": "<",
  "&gt;": ">",
};

export class UtilsService {
  // constructor() {
  //     // window.errorLog = window.errorLog || lsu.lsGet("errorLog") || [];
  // }
  dateInterval = {
    years: "y",
    quarters: "Q",
    months: "M",
    weeks: "w",
    days: "d",
    hours: "h",
    minutes: "m",
    seconds: "s",
    milliseconds: "ms",
  };

  encodeXml(string) {
    if (!string) return "";
    return string.replace(/([&"<>])/g, function (str, item) {
      return xml_special_to_escaped_one_map[item];
    });
  }

  decodeXml(string) {
    if (!string) return "";
    return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function (str, item) {
      return escaped_one_to_xml_special_map[item];
    });
  }

  getScreenPlayArea() {
    const headerHeight = 48;
    const footerHeight = 49;
    return window.innerHeight - headerHeight - footerHeight - 12;
  }

  groupByObject(lstAry, property) {
    // console.log(lstAry, property)
    var objResult = {};
    lstAry.forEach((item) => {
      if (!objResult[item[property]]) objResult[item[property]] = [item];
      else objResult[item[property]].push(item);
    });

    // objResult.propo.toArray = function () {
    //     return Object.keys(objResult).map(strKey => {
    //         return objResult[strKey];
    //     });
    // }
    return objResult;
  }

  objectGroupToArray(object) {
    return Object.keys(object).map((strKey) => {
      return object[strKey];
    });
  }

  prepareErrorMessage = (err) => {
    if (typeof err === "string") {
      return err;
    }
    if (typeof err === "object") {
      if (typeof err.error === "string") return err.error;

      if (typeof err.message === "string")
        // JS/Nodejs Exception
        return err.message;

      if (typeof err.Message === "string")
        // .net Exception
        return err.Message;

      if (typeof err.msg === "string")
        // Old Nodejs exception
        return err.msg;

      if (typeof err.ObjException === "object")
        // Old Nodejs exception
        return err.ObjException.Message;
    }
    return "Unexpected Error";
  };

  showLoader() {
    var loader = document.getElementById("divLoader");
    if (loader) loader.style.display = "block";
  }

  hideLoader() {
    var loader = document.getElementById("divLoader");
    if (loader) loader.style.display = "none";
  }

  showAlert(msg, type, option = {}) {
    try {
      if (typeof msg !== "string") {
        msg = this.prepareErrorMessage(msg);
        if (!msg) msg = "Error: " + JSON.stringify(msg);

        console.log("showAlert: ", msg, JSON.stringify(msg), type);
        // return swal("Unknown Error: Message must be string", "error")
      }

      let title = "";
      let message = msg;
      let icon = "info";

      if (enums.ALERT_TYPE.SUCCESS === type) icon = "success";
      if (enums.ALERT_TYPE.ERROR === type) icon = "error";
      if (enums.ALERT_TYPE.INFO === type) icon = "info";
      if (enums.ALERT_TYPE.WARNING === type) icon = "warning";
      swal({
        icon,
        title: title,
        text: message,
        timer: option.timeout,
      });
    } catch (ex) {
      console.log(ex, msg, type);
    }
  }

  showInfo(msg, options) {
    // this.snackbarError(msg)
    this.showAlert(msg, enums.ALERT_TYPE.INFO, options);
  }

  showError(msg, options) {
    // this.snackbarError(msg)
    this.showAlert(msg, enums.ALERT_TYPE.ERROR, options);
  }

  showWarning(msg, options) {
    // this.snackbarWarning(msg)
    this.showAlert(msg, enums.ALERT_TYPE.WARNING, options);
  }

  showSuccess(msg, options) {
    // this.snackbarSuccess(msg)
    this.showAlert(msg, enums.ALERT_TYPE.SUCCESS, options);
  }

  showConfirm(title, description = "", icon = "warning", dangerMode = false) {
    return new Promise((resolve) => {
      let options = {};
      options = { title, icon, dangerMode, buttons: true };
      if (description) options.text = description;
      swal(options).then((willDelete) => {
        if (!willDelete) resolve(false);
        resolve(true);
      });
    });
  }

  tryJSONParse(string) {
    try {
      return JSON.parse(string);
    } catch (ex) {
      return null;
    }
  }

  isValidEmail(email) {
    if (typeof email !== "string") return false;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidMobile(mobile) {
    var pattern = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    if (!pattern.test(mobile)) return false;
    return true;
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  convertToCamelCase(str, splitBy = " ", replaceUnderscore = false) {
    if (replaceUnderscore) str = str.replace("_", " ");

    return str
      .split(splitBy)
      .map((word) => {
        return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join(" ");
  }

  ConvertAllToUpperCase(str = "", splitBy = " ", replaceWith = "_") {
    return str.toString().replace(/\s+/g, "_").toUpperCase();
  }

  convertFirstCharCap(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
  }

  getFirstChar(str) {
    return str && str.substr ? str.substr(0, 1) : "";
  }

  getRandomColorHexValue() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  convertDateToAgo(date) {
    try {
      if (!date) return "";
      date = moment(date).toDate();
      var dateNow = new Date();
      var dateThen = date;
      var dateDiffInSec = (dateNow.getTime() - dateThen.getTime()) / 1000;
      var units = -1;
      var interval = "Second";
      if (dateDiffInSec < 6) {
        return " Just Now";
      } else if (dateDiffInSec < 60 && dateDiffInSec > 10) {
        units = Math.floor(dateDiffInSec);
        interval = "Second";
      } else if (dateDiffInSec > 60 && dateDiffInSec < 3600) {
        units = Math.floor(dateDiffInSec / 60);
        interval = "Minute";
      } else if (dateDiffInSec > 60 && dateDiffInSec < 3600 * 24) {
        units = Math.floor(dateDiffInSec / 60 / 60);
        interval = "Hour";
      } else if (dateDiffInSec > 3600 * 24 && dateDiffInSec < 3600 * 24 * 7) {
        units = Math.floor(dateDiffInSec / 60 / 60 / 24);
        interval = "Day";
      } else if (
        dateDiffInSec > 3600 * 24 * 7 &&
        dateDiffInSec < 3600 * 24 * 30
      ) {
        units = Math.floor(dateDiffInSec / 60 / 60 / 24 / 7);
        interval = "Week";
      } else if (
        dateDiffInSec > 3600 * 24 * 30 &&
        dateDiffInSec < 3600 * 24 * 365
      ) {
        units = Math.floor(dateDiffInSec / 60 / 60 / 24 / 30);
        interval = "Month";
      } else if (dateDiffInSec > 3600 * 24 * 365) {
        units = Math.floor(dateDiffInSec / 60 / 60 / 24 / 365);
        interval = "Year";
      }
      if (units === 1) {
        return `${units} ${interval} Ago`;
      } else {
        return `${units} ${interval}s Ago`;
      }
      // return moment(date).format(config.C_SDF_INCL_HM);
    } catch (ex) {
      return date;
    }
  }

  setTimeout(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  convertToSystemDateFormate = (date) => {
    if (!date) return "";
    let parseDate = date;
    if (!parseDate || parseDate === "Invalid Date") return "";
    return moment(parseDate).format("DD/MM/YYYY");
  };

  convertToYYYYMMDDFormat = (date) => {
    if (!date) return "";
    let parseDate = date;
    if (!parseDate || parseDate === "Invalid Date") return "";
    return moment(parseDate).format("DD/MM/YYYY");
  };

  convertToYYYYMMDDHHMMSSFormat = (date) => {
    if (!date) return "";
    let parseDate = date;
    if (!parseDate || parseDate === "Invalid Date") return "";
    return moment(parseDate).format("DD/MM/YYYY HH:mm:ss");
  };

  convertToSystemDateTimeFormate = (date, showSeconds = false) => {
    if (!date) return "";
    let parseDate = date;
    if (!parseDate || parseDate === "Invalid Date") return "";
    return moment(parseDate).format(
      `DD/MM/YYYY hh:mm${showSeconds ? ":ss" : ""} A`
    );
  };

  convertToAPIDateFormat(date) {
    if (!date) return "";
    return moment(date).format("DD/MM/YYYY");
  }

  convertToJSONDate(date) {
    if (!(date instanceof Date)) date = new Date(date);
    if (!date.getTime()) return "";
    return "/Date(" + date.getTime() + ")/";
  }

  getHHMMFormatFromMinute(minute) {
    minute = parseInt(minute);
    if (!minute) return 0;
    return `${Math.floor(minute / 60)
      .toString()
      .padStart(2, "0")}:${(minute % 60).toString().padStart(2, "0")}`;
  }

  isStringValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (ex) {
      return false;
    }
  }

  isDesktop() {
    return document.body.clientWidth > 812;
  }

  filterEnumByBWs(objEnum, BWs) {
    let obj = {};
    for (let key in objEnum) {
      if (this.isBitActive(BWs, objEnum[key])) obj[key] = objEnum[key];
    }
    return obj;
  }

  isBitActive(BWs, BW) {
    return (BWs & BW) === BW;
  }

  getUUID() {
    return v4();
  }

  toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  toArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  FileToText(objFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(objFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // It clears service worker cache. and return promise.
  async clearServiceWorkerCache() {
    let keys = await caches.keys();
    return Promise.all(
      keys.map(function (key) {
        return caches.delete(key);
      })
    );
  }

  async getAppVersion() {
    return await (await fetch("/version.txt?" + Date.now())).text();
  }

  parseQueryString(str) {
    return qs.parse(str.toString().replace("?", ""));
  }

  encodeQueryObject(searchObject) {
    try {
      return btoa(JSON.stringify(searchObject));
    } catch (ex) {
      return "";
    }
  }

  decodeQueryObject(strSearch) {
    try {
      let query = this.parseQueryString(strSearch);
      return JSON.parse(atob(query.q));
    } catch (ex) {
      return null;
    }
  }

  snackbar(message, variant) {
    this.fireEvent(enums.EVENT.ENQUEUE_SNACKBAR, {
      message: message,
      options: {
        variant: variant,
      },
    });
  }

  fireEvent(eventName, data, sendResponse) {
    let event = new CustomEvent(eventName, { detail: { data, sendResponse } });
    document.dispatchEvent(event);
    return event;
  }

  snackbarSuccess(message) {
    this.snackbar(message, "success");
  }

  snackbarError(message) {
    this.snackbar(message, "error");
  }

  snackbarWarning(message) {
    this.snackbar(message, "warning");
  }
  snackbarInfo(message) {
    this.snackbar(message, "info");
  }

  convertObjectToKeyValues(obj) {
    if (!obj) return;
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] !== "object") newObj[key] = obj[key];
    });
    return newObj;
  }

  getEnumString(obj, value = "") {
    if (!obj) return "NONE";
    let found = Object.keys(obj).find((key) => obj[key] === value);
    return found || "NONE";
  }

  toDataURL(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  getBase64FromDataURI(str) {
    let index = str.indexOf(";base64,");
    return str.substr(index + ";base64,".length);
  }

  getContrastColorFromHex(hex, bw = true) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return (
      "#" +
      r.toString().padStart(2) +
      g.toString().padStart(2) +
      b.toString().padStart(2)
    );
  }

  SortObjectASC(SourceArray = [], Property = "") {
    SourceArray.sort(function (obj1, obj2) {
      if (obj1[Property] === null) return -1;

      if (obj2[Property] === null) return 1;

      if (obj1[Property] === obj2[Property]) return 0; // 0 means 'obj1' & 'obj1' both are equal property  do nothing

      if (obj1[Property] > obj2[Property]) return 1; // 1 means 'obj1' should be placed after 'obj2'.

      if (obj1[Property] < obj2[Property]) return -1; // -1 means 'obj2' should be placed after 'obj1'.
      return 0;
    });
  }

  getHourMinutesStringFromMinutes(minutes) {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }

  convertEnumToOptions(objEnum) {
    return Object.keys(objEnum).map((key) => {
      return {
        id: objEnum[key],
        label: key,
      };
    });
  }

  convertEnumToValues(objEnum) {
    return Object.keys(objEnum).map((key) => objEnum[key]);
  }

  copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    let container = document.activeElement || document.body;
    container.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let status = false;
    try {
      status = document.execCommand("copy");
    } catch (err) {
      status = false;
    }

    container.removeChild(textArea);
    return status;
  }

  toFixed(stringOrNumber, position = 2) {
    let floatNumber = parseFloat(stringOrNumber);
    if (floatNumber) return floatNumber.toFixed(position);
    return "0.00";
  }

  toFixedString(stringOrNumber, position = 2) {
    let floatNumber = parseFloat(stringOrNumber);
    if (floatNumber) return parseFloat(floatNumber.toFixed(position));
    return "";
  }

  toInteger(stringOrNumber) {
    let floatNumber = parseInt(stringOrNumber);
    if (floatNumber) return floatNumber;
    return "";
  }

  prettyPrice(number) {
    return new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "GBP",
    }).format(number);
  }

  prettyDate(date) {
    return moment(date).format("ll");
  }

  prettyDateTime(date) {
    return moment(date).format("lll");
  }

  downloadFile(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  convertToBase64FromDataURI(base64 = "") {
    return base64.replace(/^data:.+;base64,/, "");
  }

  convertToDataURIFromBase64(base64, mime = "image/png") {
    return `data:${mime};base64,${base64}`;
  }

  convertToDataURIFromBase64ForPdf(base64, mime = "application/pdf") {
    return `data:${mime};base64,${base64}`;
  }

  async convertDataURIToObjectURL(dataURL) {
    return URL.createObjectURL(await (await fetch(dataURL)).blob());
  }

  getAge(dateString) {
    return moment().diff(dateString, "years", true);
  }

  forceWindowOpen(url, target = "_blank", options = {}) {
    let windowOptions = {
      left: "0",
      top: "0",
      scrollbars: "yes",
      resizable: "Yes",
      width: window.screen.width,
      height: window.screen.height,
      fullscreen: "yes",
      toolbar: "yes",
      titlebar: "yes",
      menubar: "yes",
      location: "yes",
    };
    for (let key in options) {
      if (options[key]) windowOptions[key] = options[key];
    }

    let optionStr = Object.keys(windowOptions)
      .map((key) => `${key}=${windowOptions[key]}`)
      .join(",");
    console.log(optionStr);
    if (options.extraForce !== false)
      window.location.assign(
        `javascript: window.open('${url}', '${target}', "${optionStr}")`
      );
    else window.open(url, target, optionStr);
  }

  setOnWindowClose(win, onClose) {
    var timer = setInterval(checkChild, 500);
    function checkChild() {
      if (win.closed) {
        if (onClose) onClose();
        clearInterval(timer);
      }
    }
  }

  isMinDate(dateStr) {
    return /1\/1\/0001/.test(dateStr);
  }

  isIPhone() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  stringToColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
const utils = new UtilsService();
window.utils = utils;
export default utils;
