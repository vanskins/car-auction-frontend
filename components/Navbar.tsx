"use client"
import Link from 'next/link'
import { useCookies } from 'next-client-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const cookies = useCookies();
  const authToken = cookies.get('CAR-AUCTION-API-AUTH')

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <p className="logo_text">CAR AUCTION</p>
      </Link>
      {
        authToken &&
        <div className="flex gap-3 md:gap-5">
          <Link href="/feed" className="outline_btn">
            Feed
          </Link>
          <Link href="/profile" className="black_btn">
            Profile
          </Link>
          <Link 
            href="/"
            className="blue_btn" 
            onClick={() => {
              cookies.remove('CAR-AUCTION-API-AUTH')
              toast("Logging out");
            }}
          >
            Logout
          </Link>
        </div>
      }
    </nav>
  )
}

export default Navbar