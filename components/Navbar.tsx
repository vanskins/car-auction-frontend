import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2">
        <p className="logo_text">CAR AUCTION</p>
      </Link>
      <div className="flex gap-3 md:gap-5">
        <Link href="/profile" className="black_btn">
          Profile
        </Link>
      </div>
    </nav>
  )
}

export default Navbar