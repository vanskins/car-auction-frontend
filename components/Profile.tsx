"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const Profile = () => {
  const [profile, setProfile] = useState<any>({})
  const [auctions, setAuctions] = useState<any[]>([])
  const [newAuction, setNewAuction] = useState<any>({})
  const [submitting, isSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const profile = async () => {
      const response = await axios.get('http://localhost:8080/api/profile/me', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response && response.statusText === "OK") {
        setProfile(response.data)
      }
    }
    profile()
  }, [])

  useEffect(() => {
    const getMyAuctions = async () => {
      const response = await axios.get('http://localhost:8080/api/auctions/me', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response && response.statusText === "OK") {
        setAuctions(response.data)
      }
    }
    getMyAuctions()
  }, [submitting])
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isSubmitting(true)
    if (newAuction) {
      try {
        const response = await axios.post('http://localhost:8080/api/auction',
        {
          "brand": newAuction.brand,
          "year": newAuction.year,
          "model": newAuction.model,
          "openingPrice": newAuction.openingPrice,
          "expiryDate": newAuction.expiryDate,
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
          setNewAuction({})
          // setAuctions([...auctions, response.data])
        }
      } catch (error) {
        console.log(error, 'Error')
        isSubmitting(false)
      }
    } 
  }

  return (
    <>
      <p className="desc text-center">
        Hello, {`${profile.firstName} ${profile.lastName}`}
      </p>
      <br />
      <div className="w-full flex flex-row">
        <div className="w-full text-left">
          <h1 className="font-bold text-4xl">Create new auction</h1>
          <form
            className="mt-10 w-full flex flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <label htmlFor="">
              <span className="font-satoshi font-semibold text-base text-gray-700">Brand</span>
            </label>
            <input
              placeholder="Brand"
              required
              className="form_input"
              type="text"
              value={newAuction.brand}
              onChange={(e) => setNewAuction({ ...newAuction, brand: e.target.value })}
            />
            <label htmlFor="">
              <span className="font-satoshi font-semibold text-base text-gray-700">Year</span>
            </label>
            <input
              placeholder="Year"
              required
              className="form_input"
              type="text"
              value={newAuction.year}
              onChange={(e) => setNewAuction({ ...newAuction, year: e.target.value })}
            />
            <label htmlFor="">
              <span className="font-satoshi font-semibold text-base text-gray-700">Model</span>
            </label>
            <input
              placeholder="Model"
              required
              className="form_input"
              type="text"
              value={newAuction.model}
              onChange={(e) => setNewAuction({ ...newAuction, model: e.target.value })}
            />
            <label htmlFor="">
              <span className="font-satoshi font-semibold text-base text-gray-700">Opening price</span>
            </label>
            <input
              placeholder="Opening price"
              required
              className="form_input"
              type="text"
              value={newAuction.openingPrice}
              onChange={(e) => setNewAuction({ ...newAuction, openingPrice: e.target.value })}
            />
            <label htmlFor="">
              <span className="font-satoshi font-semibold text-base text-gray-700">Expiry date</span>
            </label>
            <input
              placeholder="Expiry date"
              required
              className="form_input"
              type="date"
              value={newAuction.expiryDate}
              onChange={(e) => setNewAuction({ ...newAuction, expiryDate: e.target.value })}
            />
            <div className="flex-end mx-3 mb-5 gap-4">
              <button
                type="submit"
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full ml-5 mb-5">
          <h1 className="font-bold text-left text-4xl">Your auctions</h1>
          <br />
          {
            auctions && auctions.map((item: any, k: number) => {
              return (
                <div className="rounded-md bg-white shadow-lg w-full mt-4 p-2" key={k}>
                  <div className="flex flex-col">
                    <p className="bg-green-600 text-white p-2 mb-2 font-semibold rounded-md">Status: {item.open ? "OPEN" : "CLOSED"}</p>
                    <p className="font-satoshi font-semibold text-gray-900">Name: {item.user.firstName}, {item.user.lastName}</p>
                    <p>Contacts: {item.user.phoneNumber}, {item.user.email}</p>
                    <p>Email: {item.user.email}</p>
                    <br />
                    <p>Brand - {item.brand}</p>
                    <p>Year and model - {item.year}, {item.model}</p>
                    <p>Opening price - ₱{item.openingPrice.toLocaleString("en-US")}</p>
                    <p>Current price - ₱{item.priceIncrement.toLocaleString("en-US")}</p>
                    <p>Expiry date - {item.expiryDate}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Profile