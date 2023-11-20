"use client"
import { useEffect, useReducer } from 'react'
import UserContext, { initialState, reducer, actions } from '@/store/userContext'
import { useCookies } from 'next-client-cookies';

const Layout = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const cookies = useCookies();
  const authToken = cookies.get('CAR-AUCTION-API-AUTH')
  useEffect(() => {
    if (authToken) {
      dispatch({ type: actions.ADD_AUTH_TOKEN, authToken });
    }
  }, [])

  const value = {
    state,
    addAuthToken: (token: string) => {
      dispatch({ type: actions.ADD_AUTH_TOKEN, authToken: token });
    },
    removeAuthToken: () => {
      cookies.remove('CAR-AUCTION-API-AUTH')
      dispatch({ type: actions.REMOVE_AUTH_TOKEN });
    },
  };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Layout