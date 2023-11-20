import React from 'react'
import Feed from '@/components/Feed'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const FeedPage = () => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('CAR-AUCTION-API-AUTH')
  if (!authToken) {
    redirect('/login')
  }
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AUCTION FEED</span>
      </h1>
      <p className="desc text-center">
        List of Active Auctions
      </p>
      <Feed />
    </section>
  )
}

export default FeedPage