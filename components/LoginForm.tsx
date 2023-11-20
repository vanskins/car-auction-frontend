type Props = {
  submitting: boolean;
  data: any;
  setData: (val: any) => void;
  handleSubmit: (e: any) => void;
}

const LoginForm = ({ submitting, setData, handleSubmit, data}: Props) => {
  return (
    <section className="w-full mt-10 max-w-full flex-end flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">Login</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Email address</span>
        </label>
        <input
          placeholder="email"
          required
          value={data.email}
          className="form_input"
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Password</span>
        </label>
        <input
          placeholder="password"
          required
          value={data.password}
          className="form_input"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-green-600 rounded-full text-white"
          >
            Register
          </button>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm