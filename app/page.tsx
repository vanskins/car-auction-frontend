"use client"

import { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm'
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'

export default function Home() {
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
        router.push('/feed')
      }
      console.log(user, 'RES')
    } catch (error) {
      console.log(error, 'Error')
    }
  }

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        CAR AUCTION APP
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">GET YOUR DREAM CAR</span>
      </h1>
      <p className="desc text-center">
        Car auction app is a platform where people can get their cars in an auction and
        people can bid. Developed by Van Alfred P. Sabacajan
      </p>
      <LoginForm
        data={data}
        setData={setData}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </section>
  )
}
