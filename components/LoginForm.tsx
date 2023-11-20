"use client"

import Link from 'next/link'
import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import UserContext from '@/store/userContext';

type Context = {
  state: any;
  setState: () => void
}

const LoginForm = () => {
  const { addAuthToken } = useContext(UserContext);
  
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const router = useRouter() 
  const cookies = useCookies();

  useEffect(() => {
    const authToken = cookies.get('CAR-AUCTION-API-AUTH')
    if (authToken) {
      router.push('/feed')
    }
  }, [])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        })
      })
      const user = await response.json();
      if (response.ok) {
        cookies.set('CAR-AUCTION-API-AUTH', user.authentication.sessionToken)
        toast('Login succcessfully!')
        addAuthToken(user.authentication.sessionToken)
        router.replace('/feed')
      }
    } catch (error) {
      toast('Incorrect credentials, please try again.')
    }
  }

  return (
    <section className="w-full mt-10 max-w-full flex-end flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">Login</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Email address</span>
        </label>
        <input
          placeholder="email"
          required
          value={data.email}
          className="form_input"
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Password</span>
        </label>
        <input
          placeholder="password"
          required
          value={data.password}
          className="form_input"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/register">
            <button
              type="submit"
              className="px-5 py-1.5 text-sm bg-green-600 rounded-full text-white"
            >
              Register
            </button>
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm