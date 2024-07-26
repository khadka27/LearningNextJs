"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const responsetoken = await axios.post("/api/user/verifyemail", {
        token,
      }); // this is the api route
      console.log("Email verified successfully", responsetoken.data); // this is the console log
      toast.success("Email verified successfully"); // this is the toast notification
      setLoading(false);
      setVerified(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      toast.error("Something went wrong"); // this is the toast notification
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 bg-sky">Verify Email</h1>
      <h2 className="text-xl mb-4 text-gray-700 bg-sky-600">
        {token ? `${token}` : "notoken"}
      </h2>

      {verified && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <h2 className="font-semibold">Email verified successfully</h2>
          <Link
            href="/login"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <h2 className="font-semibold">Something went wrong</h2>
        </div>
      )}
    </div>
  );
}
