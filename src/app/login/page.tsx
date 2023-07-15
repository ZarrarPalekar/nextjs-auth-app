"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    setButtonDisabled(true);
    try {
      const res = await axios.post("/api/users/login", user);
      if (res.status === 200) {
        toast.success("Login successful");
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">User Name</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter a email"
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
        disabled={buttonDisabled}
        style={{ cursor: buttonDisabled ? "not-allowed" : "pointer" }}
      >
        {/* {buttonDisabled ? "Not Allowed" : "Sign Up"} */}
        Login
      </button>
      <Link href="/signup">New User? Go to Sign Up</Link>
    </div>
  );
};

export default Login;
