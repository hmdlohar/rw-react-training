import * as $ from "jquery";
import utils from "./Utils";
import config from "../config";

class HttpService {
  constructor() {
    window.requests = window.requests || [];
  }
  createJqReq(url, headers, type, data = undefined, options = {}) {
    let xhr = function () {
      xhr = new window.XMLHttpRequest();

      if (typeof options.onUploadProgress === "function") {
        xhr.upload.addEventListener(
          "progress",
          options.onUploadProgress,
          false
        );
      }

      return xhr;
    };
    let objReq = {
      url,
      type: type,
      headers,
      responseType: "json",
      data,
      xhr,
      xhrFields: {
        // withCredentials: true,
      },
    };
    // headers["CommonToken"] = enums.COMMON_TOKEN;
    // headers["Authorization"] = 'Bearer ' + auth.getToken();

    if (headers["Content-Type"] === "application/json" && type !== "GET") {
      objReq.data = JSON.stringify(data);
      objReq.processData = false;
    }
    return objReq;
  }

  handleError(ex) {
    if (ex.responseText) {
      let error = "";
      try {
        let jErr = JSON.parse(ex.responseText);
        error = jErr; //+-Manik 20200224
      } catch (ex2) {
        error = ex.responseText;
      }
      throw error;
    } else if (ex.statusText) {
      //++Manik 20200225
      throw new Error(
        `Http request is unable to complete, Status: ${ex.statusText
        }, State: ${ex.state()}`
      );
    } else if (typeof ex === "string") {
      throw new Error(ex);
    } else if (ex.length > 0) {
      throw new Error(ex[0]);
    } else if (ex instanceof Error) {
      throw ex;
    } else if (ex === undefined) {
      throw new Error("Undefined Error. ");
    } else {
      throw new Error("Unexpected Error. " + JSON.stringify(ex));
    }
  }

  handleSuccess(data) {
    return data;
  }

  async get(url, headers = {}) {
    try {
      let objAjax = $.ajax(this.createJqReq(url, headers, "GET"));
      let responseData = await objAjax;
      if (typeof responseData === "string" && utils.tryJSONParse(responseData))
        responseData = JSON.parse(responseData);

      if (responseData.status || responseData.success)
        return this.handleSuccess(responseData);
      else return this.handleError(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  async post(url, data, headers = {}) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
    try {
      let objAjax = $.ajax(this.createJqReq(url, headers, "POST", data));
      let responseData = await objAjax;
      if (typeof responseData === "string" && utils.tryJSONParse(responseData))
        responseData = JSON.parse(responseData);

      if (responseData.status || responseData.success)
        return this.handleSuccess(responseData);
      else return this.handleError(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  async put(url, data, headers = {}) {
    headers = { "Content-Type": "application/json", ...headers };
    try {
      let responseData = await $.ajax(
        this.createJqReq(url, headers, "PUT", data)
      );
      return this.handleSuccess(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  async delete(url, data, headers = {}) {
    headers = { "Content-Type": "application/json", ...headers };
    try {
      let responseData = await $.ajax(
        this.createJqReq(url, headers, "DELETE", data)
      );
      return this.handleSuccess(responseData);
    } catch (ex) {
      this.handleError(ex);
    }
  }

  async googo(ClassJOperationIC, KeyValues, options) {
    if (!options)
      options = { requestId: null, loading: null, showLoader: false };
    try {
      let headers = { "Content-Type": "application/x-www-form-urlencoded" }; // { "Content-Type": "application/json" };
      let data = {
        GJIJ: JSON.stringify({
          __RWSUSC: "",
          ClassJOperationIC,
          KeyValues,
          __RWAC: "RWCLIENTWEB",
          // __TDID: "RW_W_4ede775d-9a54-fe07-610f-75fc8b87455b"
        }),
      };

      let url = config.API_URL;
      if (process.env.NODE_ENV === "development") {
        url = config.API_URL + "?OC=" + ClassJOperationIC;
      }

      let objAjax = $.ajax(this.createJqReq(url, headers, "POST", data));

      if (options.requestId) {
        window.requests[options.requestId] = objAjax;
      }

      if (options.showLoader) utils.showLoader();
      let responseData = await objAjax;



      if (!responseData.d) {
        throw responseData; // -Manik 20200224
      }
      return this.handleSuccess(responseData.d);
    } catch (ex) {
      this.handleError(ex);

    } finally {
      if (options.showLoader) utils.hideLoader();
    }
  }
}

const http = new HttpService();
window.http = http;
export default http;
