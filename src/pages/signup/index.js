import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'

const Signup = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/userSignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      })
    })
    const res = await response.json();

    if (res.success) {
      localStorage.setItem("token", res.authToken);
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("isAdmin", false)
      router.push("/");
    }
    else {
      alert("Enter Valid Credentials...")
    }
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div style={{ height: "90vh", backgroundImage: 'url(https://img.freepik.com/free-photo/delicious-pizza-indoors_23-2150857732.jpg?t=st=1733571782~exp=1733575382~hmac=8aea7810154e8e7f5bb904830c52237ca9e68343b4fb209163bd8c6aa6b3c802&w=826)', backgroundSize: "cover" }} className='flex justify-center items-center'>

      <div className="container w-full max-w-md">
        <form onSubmit={handleSubmit} className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 '>

          <div className='mb-4'>
            <label htmlFor="name"
              className='block text-gray-300 text-sm font-bold mb-2'>
              Username
            </label>
            <input
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your name'
              name='name' type="text" value={credentials.name}
              required
              onChange={handleChange} />
          </div>
          <div className='mb-4'>
            <label htmlFor="email"
              className='block text-gray-300 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your email'
              name='email' type="email" value={credentials.email}
              required
              onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <label htmlFor="password"
              className='block text-gray-300 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              placeholder='******'
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              name='password' type="password" value={credentials.password}
              required
              onChange={handleChange} />
          </div>
          <div className='mb-4'>
            <label htmlFor="location"
              className='block text-gray-300 text-sm font-bold mb-2'>
              Address
            </label>
            <input
              placeholder='Enter your address'
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              name='location' type="text" value={credentials.location}
              required
              onChange={handleChange} />
          </div>
          <div className='flex items-center justify-between'></div>
          <button type='submit' className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100">Signup</button>

          <Link href={"/login"} style={{ all: "unset" }}>

            <button className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100">Already a user?</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup;
