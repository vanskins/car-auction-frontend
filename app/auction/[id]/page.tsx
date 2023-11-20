import Auction from "@/components/Auction"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AuctionPage = ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('CAR-AUCTION-API-AUTH')
  if (!authToken) {
    redirect('/login')
  }
  return (
    <section className="w-full flex-center flex-col">
      <Auction
        params={params}
      />
    </section>
  )
}

export default AuctionPage