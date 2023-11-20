import { createContext } from "react";

export const initialState = {
  authToken: null,
  user: null
}

export const actions = {
  ADD_AUTH_TOKEN: "ADD_AUTH_TOKEN",
  REMOVE_AUTH_TOKEN: "REMOVE_AUTH_TOKEN",
  ADD_USER_DETAILS: "ADD_USER_DETAILS",
  CLEAR_STATE: "CLEAR_STATE"
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.ADD_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      };
    case actions.REMOVE_AUTH_TOKEN:
      return {
        ...state,
        authToken: null
      };
    case actions.ADD_USER_DETAILS:
      return {
        ...state,
        user: action.payload
      }
    case actions.CLEAR_STATE:
      return {
        authToken: null,
        user: null
      }
    default:
      return state;
  }
};
const UserContext = createContext<any>({})

export default UserContext;