/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Button, Spinner } from 'flowbite-react'
import { User, Lock } from 'lucide-react';
const Login = ({
  form,
  handleChange,
  handleFormSubmit,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-center" style={{paddingTop: '60px'}}>
      <div className="px-8 py-6 text-left bg-white shadow-lg rounded-xl w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-6">
          <Button 
            type="submit" 
            className="mt-4 w-full bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" light={true} className="mr-2" />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          </div>
        </form>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              New to our platform?
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/register"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up for an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login