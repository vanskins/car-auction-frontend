"use client"
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '@/store/userContext';

const Navbar = () => {
  const { state, removeAuthToken } = useContext(UserContext);
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <p className="logo_text">CAR AUCTION</p>
      </Link>
      {
        state.authToken &&
        <div className="flex gap-3 md:gap-5">
          <Link href="/feed" className="outline_btn">
            Feed
          </Link>
          <Link href="/profile" className="black_btn">
            Profile
          </Link>
          <Link 
            href="/login"
            className="blue_btn" 
            onClick={() => {
              removeAuthToken();
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