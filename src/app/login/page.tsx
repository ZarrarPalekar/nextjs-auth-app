"use client";

import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    password: "",
    username: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Log In</h1>
      <hr />
      <label htmlFor="username">User Name</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter a username"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter a password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {/* {buttonDisabled ? "Not Allowed" : "Sign Up"} */}
        Login
      </button>
      <Link href="/signup">New User? Go to Sign Up</Link>
    </div>
  );
};

export default Login;
