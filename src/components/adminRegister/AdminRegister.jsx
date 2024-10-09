/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const AdminRegister = ({
  handleChange,
  handleFormSubmit,
  form
}) => {
  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign Up to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Dox Smith"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Your Mobile</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="1234567899"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account? <Link to='/admin' className="font-medium text-blue-600 hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister