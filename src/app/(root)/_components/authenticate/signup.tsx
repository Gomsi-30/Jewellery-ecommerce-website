'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldError, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type SignupProps = {
  openLoginModal: () => void;
  name?:string;
}

const Signup: React.FC<SignupProps> = ({ openLoginModal,name='Signup Here' }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    
    toast.success('Sign-up successful!');
    reset();
  };

  const onError = () => {
    toast.error('Please check your inputs!');
  };

  return (
    <div className="flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className={`w-full mt-1 px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
{errors.firstName && (
  <p className="text-red-500 text-sm mt-1">
    {typeof errors.firstName === 'string' 
      ? errors.firstName 
      : (errors.firstName as FieldError).message || 'Error'}
  </p>
)}


          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className={`w-full mt-1 px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          {errors.lastName && (
  <p className="text-red-500 text-sm mt-1">
    {typeof errors.lastName === 'string' 
      ? errors.lastName 
      : (errors.lastName as FieldError).message || 'Error'}
  </p>
)}


          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full mt-1 px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
      {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {typeof errors.email === 'string' 
      ? errors.email 
      : (errors.email as FieldError).message || 'Error'}
  </p>
)}


          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className={`w-full mt-1 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[67%] transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
            {errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {typeof errors.password === 'string' 
      ? errors.password 
      : (errors.password as FieldError).message || 'Error'}
  </p>
)}


          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md"
          >
            {name}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={openLoginModal}
                className="text-pink-500 hover:text-pink-600"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
