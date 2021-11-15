import axios from "axios";
import { AUTH } from "../constants";
import CoreServices from "./coreServices";

class ConnectionServices extends CoreServices {
  async LOGIN(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.LOCAL}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async REGISTER(payload) {
    try {
      const { data, error } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.REGISTER}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async FORGOT_PASSWORD(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.FORGOT_PASSWORD}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async EMAIL_CONFIRMATION(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.EMAIL_CONFIRMATION}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async SEND_EMAIL_CONFIRMATION(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.SEND_EMAIL_CONFIRMATION}`,
        payload
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  async CHANGE_PASSWORD(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.CHANGE_PASSWORD}`,
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

  async RESET_PASSWORD(payload) {
    try {
      const { data } = await axios.post(
        `${this.apiEnpoint}${AUTH.BASE}${AUTH.RESET_PASSWORD}`,
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

  async LOGIN_WITH_PROVIDER(provider, query) {
    try {
      const { data } = await axios.get(
        `${this.apiEnpoint}${AUTH.BASE}/${provider}${AUTH.PROVIDER.CALLBACK}${query}`
      );
      return { data };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  REDIRECT_PROVIDER(provider) {
    window.location.href = `${this.apiEnpoint}${AUTH.PROVIDER.CONNECT}/${provider}`;
  }
}

export default new ConnectionServices();
