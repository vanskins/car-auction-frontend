import LoginForm from "@/components/LoginForm"

export default function Home() {

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
      <LoginForm />
    </section>
  )
}
