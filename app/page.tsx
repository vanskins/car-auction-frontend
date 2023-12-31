import Link from "next/link"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('CAR-AUCTION-API-AUTH')
  if (authToken) {
    redirect('/feed')
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
      <Link href="/login">
        <button className="bg-green-600 p-2 font-bold w-40 text-white rounded-full mt-10">Get started</button>
      </Link>
    </section>
  )
}
