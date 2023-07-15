"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");

    if (response.status === 200) {
      setUser(response.data.data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Profile</h1>
      <hr className="w-16 border-2 border-blue-800 mb-8" />
      <p className="text-lg text-gray-600">Profile page</p>
      <div className="bg-green-500 rounded-lg p-4 mt-8">
        {user ? (
          <Link
            href={{
              pathname: `/profile/${user._id}`,
              query: { username: user.username },
            }}
            title={`View ${user.username} data`}
            className="text-white font-bold"
          >
            Go to profile
          </Link>
        ) : (
          <p className="text-white font-bold">No user details</p>
        )}
      </div>
      <hr className="w-16 border-2 border-blue-800 mt-8" />
      <button
        onClick={logout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
