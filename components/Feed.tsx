"use client";

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Auction = {
  brand: string;
  user: any;
  year: string;
  model: string;
  openingPrice: number;
  priceIncrement: number;
  expiryDate: string;
  open: boolean;
  _id: string;
}

const Feed = () => {
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const getAuctions = async () => {
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
    getAuctions()
  }, [])
  return (
    <>
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
                <Link
                  href={`/auction/${item._id}`}
                >
                  <button
                    type="submit"
                    className="px-5 w-32 font-semibold py-1.5 text-sm bg-blue-600 rounded-full text-white"
                  >
                    ₱ Place Bid
                  </button>
                </Link>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default Feed