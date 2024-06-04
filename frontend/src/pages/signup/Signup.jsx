import React from 'react'
import GenderCheckBox from './GenderCheckBox'

function Signup() {
  return (
    <div className="flex fles-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
      <h1 className="text-3xl font-semibold text-center text-white-500">
        Signup
        <span className="text-blue-500"> Chatapp</span>
      </h1>
      <form>
      <div>
          <label className="label p-2">
            <span className="text-base label-text">Full Name</span>
          </label>
          {/* <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            className="w-full input input-bordered h-10"
          /> */}
          <input type="text"  placeholder="Enter full name"class="input input-bordered input-accent w-full max-w-xs" name="fullName" />
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="w-full input input-bordered input-accent max-w-xs"
          />
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
          />
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter Confirm Password"
            className="w-full input input-bordered h-10"
          />
        </div>
        <GenderCheckBox/>
        <a
          href="#"
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
        >
         Already have an account
        </a>
        <div>
          <button className="btn btn-block btn-sm mt-2">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup