"use client"

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

const Register = () => {
  const [user, setUser] = useState<any>({})
  const [submitting, isSubmitting] = useState<boolean>(false)
  const router = useRouter() 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // isSubmitting(true)
    if (user) {
      try {
        const response = await axios.post('http://localhost:8080/auth/register',
        {
          "email": user.email,
          "password": user.password,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "phoneNumber": user.phoneNumber,
        }, 
        {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        })
        console.log(response, 'RESPONSE')
        if (response.statusText === "OK") {
          isSubmitting(false)
          setUser({})
          toast('Successfully created an Account!')
          router.push('/')
          // setAuctions([...auctions, response.data])
        }
      } catch (error) {
        toast('Cannot process request right now.')
        isSubmitting(false)
      }
    } 
  }
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Register new account</span>
      </h1>
      <div className="w-full text-left">
        <form
          className="mt-10 w-full flex flex-col gap-7 glassmorphism"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">Email</span>
          </label>
          <input
            placeholder="Email"
            required
            className="form_input"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">Password</span>
          </label>
          <input
            placeholder="Password"
            required
            className="form_input"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">First name</span>
          </label>
          <input
            placeholder="First name"
            required
            className="form_input"
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">Last name</span>
          </label>
          <input
            placeholder="Last name"
            required
            className="form_input"
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">Phone number</span>
          </label>
          <input
            placeholder="Phone number"
            required
            className="form_input"
            type="text"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
          <label htmlFor="">
            <span className="font-satoshi font-semibold text-base text-gray-700">Expiry date</span>
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <button
              type="submit"
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register