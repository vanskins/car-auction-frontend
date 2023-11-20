import Profile from "@/components/Profile"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ProfilePage = () => {
  const cookieStore = cookies()
  const authToken = cookieStore.get('CAR-AUCTION-API-AUTH')
  if (!authToken) {
    redirect('/login')
  }
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">My profile</span>
      </h1>
      <Profile />
    </section>
  )
}

export default ProfilePage