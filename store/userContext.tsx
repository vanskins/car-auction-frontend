import { createContext } from "react";

export const initialState = {
  authToken: null
}

export const actions = {
  ADD_AUTH_TOKEN: "ADD_AUTH_TOKEN",
  REMOVE_AUTH_TOKEN: "REMOVE_AUTH_TOKEN",
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
    default:
      return state;
  }
};
const UserContext = createContext<any>({})

export default UserContext;