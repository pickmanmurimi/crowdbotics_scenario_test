export default {
  crowdbotics_web_token: localStorage.getItem("crowdbotics_web_token") || "",
  user: JSON.parse(localStorage.getItem("user")) || {}
};
