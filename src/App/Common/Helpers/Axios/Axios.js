import Vue from "vue";
import Axios from "axios";
import store from "../../../../store";
import swal from "sweetalert";

Vue.prototype.$axios = Axios.create({
  baseURL: process.env.VUE_APP_API_ROOT
});

// Add a request interceptor
Vue.prototype.$axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (store.state.crowdbotics_web_token )
    {
      config.headers.authorization = 'Token ' + store.state.crowdbotics_web_token;
    }

    return config;
  },
  function(error) {
    // Do something with
    console.log("request error...");
    return Promise.reject(error);
  }
);

// Add a response interceptor
Vue.prototype.$axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (!error.response) {
      swal("Network Error :(", "Kindly check your connection", "error").then();
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        store.dispatch("logout").then();
        return Promise.reject(error);
      case 403:
        swal(error.response.data.message, "", "error").then();
        return Promise.reject(error);
      case 500:
        swal(
          "Server Error :(",
          "Kindly contact your web master",
          "error"
        ).then();
        return Promise.reject(error);
      case 422:
        break;
      case 400:
        break;
      default:
        swal("Error :(", "Kindly contact your web master", "error").then();
    }
    return Promise.reject(error);
  }
);
