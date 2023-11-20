"use client";
import { useEffect, useState } from 'react'
import axios from 'axios'

type Auction = {
  brand: string;
  user: any;
  year: string;
  model: string;
  openingPrice: number;
  priceIncrement: number;
  expiryDate: string;
  open: boolean;
}

const Feed = () => {
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const getPrompts = async () => {
      const response = await axios.get('http://localhost:8080/api/auction', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response && response.statusText === "OK") {
        setAuctions(response.data)
      }
    }
    getPrompts()
  }, [])
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AUCTION FEED</span>
      </h1>
      <p className="desc text-center">
        List of Active Auctions
      </p>
      {
        auctions.map((item, k) => {
          return (
            <div className="prompt_card mt-10 mb-10" key={k}>
              <div>
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
              <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                <button
                  type="submit"
                  className="px-5 w-32 font-semibold py-1.5 text-sm bg-blue-600 rounded-full text-white"
                >
                  ₱ Place Bid
                </button>
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default Feed