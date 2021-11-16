import config from "../config";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import { getValueFor } from "../utils/tokenStorage";

class CoreServices {
  constructor(service) {
    this.service = service;
    // this.apiEnpoint = `${"https://placifull-budget-planner-api.herokuapp.com"}`;
    this.apiEnpoint = `${"http://192.168.1.107:1337"}`;
  }

  headers(token) {
    if (token) {
      return {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      };
    } else {
      return {
        Accept: "application/json",
        "Content-type": "application/json",
      };
    }
  }

  getToken() {
    return Cookies.get("access_token");
  }

  getErrorMessage(error) {
    let { status, data } = error?.response || {};
    let msg = "";
    if (status === 500) {
      msg = "internal-error";
    } else {
      msg = data?.message?.[0]?.messages?.[0]?.message;
    }
    if (!msg) msg = "connection-error";
    return msg;
  }

  async FIND(filter) {
    try {
      let query;
      if (filter) {
        query = qs.stringify(filter);
      }
      let endpoint = `${this.apiEnpoint}${this.service}${
        query ? `?${query}` : ""
      }`;
      let { data } = await axios.get(endpoint, {
        headers: this.headers(this.getToken()),
      });
      return { data };
    } catch (error) {
      console.log(error);
    }
  }

  async FIND_FORM(filter) {
    try {
      let query;
      if (filter) {
        query = qs.stringify(filter);
      }
      let endpoint = `${this.apiEnpoint}${this.service}/form${
        query ? `?${query}` : ""
      }`;
      let { data } = await axios.get(endpoint, {
        headers: this.headers(this.getToken()),
      });
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async COUNT(filter) {
    try {
      let query;
      if (filter) {
        query = qs.stringify(filter);
      }
      let endpoint = `${this.apiEnpoint}${this.service}/count${
        query ? `?${query}` : ""
      }`;
      let { data } = await axios.get(endpoint, {
        headers: this.headers(this.getToken()),
      });
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async COUNT_SEARCH(filter) {
    try {
      let query;
      if (filter) {
        query = qs.stringify(filter);
      }
      let endpoint = `${this.apiEnpoint}${this.service}/form/count${
        query ? `?${query}` : ""
      }`;
      let { data } = await axios.get(endpoint, {
        headers: this.headers(this.getToken()),
      });
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async GET_WITHOUT_ID() {
    try {
      let { data } = await axios.get(`${this.apiEnpoint}${this.service}`, {
        headers: this.headers(this.getToken()),
      });
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async GET(id) {
    try {
      let { data } = await axios.get(
        `${this.apiEnpoint}${this.service}/${id}`,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async GET_ME() {
    try {
      let { data } = await axios.get(`${this.apiEnpoint}${this.service}/me`, {
        headers: this.headers(await getValueFor("access_token")),
      });
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async CREATE(payload) {
    try {
      let { data } = await axios.post(
        `${this.apiEnpoint}${this.service}`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async SEND_EMAIL(payload) {
    try {
      let { data } = await axios.post(
        `${this.apiEnpoint}${this.service}/send-email`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async UPDATE(id, payload) {
    try {
      let { data } = await axios.put(
        `${this.apiEnpoint}${this.service}/${id}`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async UPDATE_ME(payload) {
    try {
      let { data } = await axios.put(
        `${this.apiEnpoint}${this.service}/me`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async UPDATE_WITHOUT_ID(payload) {
    try {
      let { data } = await axios.post(
        `${this.apiEnpoint}${this.service}`,
        payload,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async DELETE(id) {
    try {
      let { data } = await axios.delete(
        `${this.apiEnpoint}${this.service}/${id}`,
        {
          headers: this.headers(this.getToken()),
        }
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }
}

export default CoreServices;
