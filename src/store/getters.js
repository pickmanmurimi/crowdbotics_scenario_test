export const isAuthenticated = (state) => !!state.crowdbotics_web_token;
export const user = (state) => state.user;
export const role = (state) => ( state.user.role );
