import userTypes from "./user.types";

export const getUserData = (user) => ({
  type: userTypes.GET_CURRENT_USER,
  payload: user,
});
