"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }: any) => {
  const searchParams = useSearchParams();

  const username = searchParams.get("username");
  console.log("search: ", username);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Profile</h1>
      <hr className="w-16 border-2 border-blue-800 mb-8" />
      <p className="text-4xl text-gray-700">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {username}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
