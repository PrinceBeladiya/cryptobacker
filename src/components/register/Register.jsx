import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TextInput, 
  Label, 
  FileInput, 
  Button, 
  Card,
  Spinner 
} from 'flowbite-react';
import { 
  HiUser, 
  HiMail, 
  HiLockClosed, 
  HiPhone, 
  HiCalendar, 
  HiUpload 
} from 'react-icons/hi';

const Register = ({ handleChange, handleFormSubmit, form, isLoading }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white   py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create your account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              icon={HiUser}
              placeholder="John Doe"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              icon={HiMail}
              placeholder="name@flowbite.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              icon={HiLockClosed}
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="mobile" value="Your Mobile" />
            </div>
            <TextInput
              id="mobile"
              name="mobile"
              type="tel"
              icon={HiPhone}
              placeholder="1234567890"
              required
              value={form.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dob" value="Date of Birth" />
            </div>
            <TextInput
              id="dob"
              name="DOB"
              type="date"
              icon={HiCalendar}
              required
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file_input" value="Upload Identity Proof" />
            </div>
            <FileInput
              id="file_input"
              name="file"
              helperText="A proof picture is useful to validate your identity (PNG, JPG or GIF)"
              onChange={handleChange}
            />
          </div>
          <Button 
            type="submit" 
            className="mt-4 bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" light={true} className="mr-2" />
                Loading...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;