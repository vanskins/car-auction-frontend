"use client"
import { useEffect, useReducer } from 'react'
import UserContext, { initialState, reducer, actions } from '@/store/userContext'
import { useCookies } from 'next-client-cookies';
import axios from 'axios';

const Layout = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const cookies = useCookies();
  const authToken = cookies.get('CAR-AUCTION-API-AUTH')
  useEffect(() => {
    const profile = async () => {
      const response = await axios.get('http://localhost:8080/api/profile/me', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response && response.statusText === "OK") {
        console.log(response.data, 'test')
        dispatch({ type: actions.ADD_USER_DETAILS, payload: response.data });
      }
    }
    if (authToken) {
      dispatch({ type: actions.ADD_AUTH_TOKEN, authToken });
      if (state.user === null) {
        profile()
      }
    }
  }, [authToken, state.user])

  const value = {
    state,
    addAuthToken: (token: string) => {
      dispatch({ type: actions.ADD_AUTH_TOKEN, authToken: token });
    },
    removeAuthToken: () => {
      cookies.remove('CAR-AUCTION-API-AUTH')
      dispatch({ type: actions.CLEAR_STATE });
    },
  };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Layout