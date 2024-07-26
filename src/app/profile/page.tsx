"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("kuch nahi");

  const getData = async () => {
    try {
      const res = await axios.post("/api/user/me");
      console.log(res.data.data_id);
      setData(res.data.data._id);
      toast.success("User found");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      console.log(res.data);
      toast.success("User logged out");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <hr className="mb-4" />
      <h2 className="text-xl mb-4">
        {data === "kuch nahi" ? (
          "kunch nahi hya"
        ) : (
          <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">
            {data}
          </Link>
        )}
      </h2>
      <div className="space-x-4">
        <button
          onClick={getData}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Get Data
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
