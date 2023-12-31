import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server';
import '@/styles/global.css'
import Navbar from '@/components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { cookies } from 'next/headers'
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Car auction',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const authToken = cookieStore.get('CAR-AUCTION-API-AUTH')
  
  return (
    <html lang="en">
      <CookiesProvider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <Layout>
            <main className="app">
              <Navbar />
              <ToastContainer />
              {children}
            </main>
          </Layout>
        </body>
      </CookiesProvider>
    </html>
  )
}
