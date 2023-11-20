"use client"

import { useState, useEffect } from 'react'
import axios, { AxiosError} from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify';
import Layout from './Layout';

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

type Bids = {
  user: any;
  bidPrice: number;
  createdAt: Date;
}

const Auction = ({ params }: { params: { id: string } }) => {
  const [auction, setAuction] = useState<Auction | null>(null)
  const [bids, setBids] = useState<Bids[] | null>(null)
  const [bidPrice, setBidPrice] = useState<string | null>(null)
  const [submitting, isSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const getAuctions = async () => {
      const response = await axios.get(`http://localhost:8080/api/auction/${params.id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      
      if (response && response.statusText === "OK") {
        setAuction(response.data)
      }
    }

    const getBids = async () => {
      const response = await axios.get(`http://localhost:8080/api/bid/${params.id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(response, 'RESPONSE')
      if (response && response.statusText === "OK") {
        setBids(response.data)
      }
    }
    getBids()
    getAuctions()
  }, [params.id, submitting])

  useEffect(() => {
    const getBids = async () => {
      const response = await axios.get(`http://localhost:8080/api/bid/${params.id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(response, 'RESPONSE')
      if (response && response.statusText === "OK") {
        setBids(response.data)
      }
    }
    getBids()
  }, [params.id, submitting])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (bidPrice) {
      isSubmitting(true)
      try {
        const response = await axios.post('http://localhost:8080/api/bid',
        {
          bidPrice: bidPrice,
          auction: params.id
        }, 
        {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        })
        if (response.statusText) {
          toast('Bid placed successfully!')
        }
        isSubmitting(false)
      } catch (error) {
        const err = error as AxiosError
        if (err && err.response && err.response.data) {
          toast(err.response.data?.message);
        }
        isSubmitting(false)
      }
    } 
  }


  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AUCTION FOR {auction && `${auction.brand}, ${auction.model} ${auction.year}`}</span>
      </h1>
      <div className="shadow-lg rounded-md w-full mt-16 p-10">
        {
          auction &&
          <div>
            <p className="bg-green-600 text-white p-2 mb-2 font-semibold rounded-md">Status: {auction.open ? "OPEN" : "CLOSED"}</p>
            <p className="font-satoshi font-semibold text-gray-900">Name: {auction.user.firstName}, {auction.user.lastName}</p>
            <p>Contacts: {auction.user.phoneNumber}, {auction.user.email}</p>
            <p>Email: {auction.user.email}</p>
            <br />
            <p>Brand - {auction.brand}</p>
            <p>Year and model - {auction.year}, {auction.model}</p>
            <p>Opening price - ₱{auction.openingPrice.toLocaleString("en-US")}</p>
            {auction.priceIncrement > 0 && <p>Next bid price is greater than - ₱{auction.priceIncrement.toLocaleString("en-US")}</p>}
            <p>Expiry date - {auction.expiryDate}</p>
          </div>
        }
      </div>
      <div className="shadow-lg rounded-md w-full mt-16 p-10 mb-16">
        <h1 className="font-bold text-left text-xl">Current bids</h1>
        <form onSubmit={handleSubmit} className="mt-10 w-full flex">
          <div className="flex w-full">
            <div className="flex-1">
              <label htmlFor="">
                <span className="font-satoshi font-semibold text-base text-gray-700">Place bid</span>
              </label>
              <input
                placeholder="$Bid"
                required
                className="form_input"
                type="text"
                onChange={(e) => setBidPrice(e.target.value)}
              />
            </div>
            <div className="flex-1 items-center">
              <button
                type="submit"
                className="self-center mt-10 ml-5 px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                Place bid
              </button>
            </div>
          </div>
        </form>
        <br />
        {
          bids && bids.map((i: Bids, k: number) => {
            return (
              <div className="rounded-md bg-white shadow-lg w-full mt-4 p-2" key={k}>
                <div className="flex flex-between">
                  <p>Name: {i.user.firstName}, {i.user.lastName}</p>
                  <p>{moment(i.createdAt).fromNow()}</p>
                </div>
                <p>Bid price: ₱{i.bidPrice.toLocaleString("en-US")}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Auction