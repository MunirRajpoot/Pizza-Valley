'use client';

import { baseUrl } from '../../utils/baseUrl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values to avoid sending empty spaces
    const payload = {
      name: credentials.name.trim(),
      email: credentials.email.trim(),
      password: credentials.password,
      location: credentials.location.trim(),
    };

    console.log("Sending:", payload);

    try {
      const response = await fetch("/api/userSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle non-JSON or empty responses safely
      const res = response.headers.get("content-type")?.includes("application/json")
        ? await response.json()
        : {};

      if (response.ok && res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("isAdmin", res.isAdmin || false);
        router.push("/");
      } else {
        alert(res.error || "Enter valid credentials...");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        height: '90vh',
        backgroundImage:
          'url(https://img.freepik.com/free-photo/delicious-pizza-indoors_23-2150857732.jpg?t=st=1733571782~exp=1733575382~hmac=8aea7810154e8e7f5bb904830c52237ca9e68343b4fb209163bd8c6aa6b3c802&w=826)',
        backgroundSize: 'cover'
      }}
      className="flex justify-center items-center"
    >
      <div className="container w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
        >
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
              Username
            </label>
            <input
              name="name"
              type="text"
              value={credentials.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="******"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-300 text-sm font-bold mb-2">
              Address
            </label>
            <input
              name="location"
              type="text"
              value={credentials.location}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
            >
              Signup
            </button>

            <Link href="/login" passHref>
              <button
                type="button"
                className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
              >
                Already a user?
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
