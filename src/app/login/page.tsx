"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const router = useRouter(); // this is the router
  const [user, setUser] = useState({
    email: "",
    password: "",
  }); // this is the user state

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const Login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user); // this is the api route
      console.log("User login up successfully", response.data); // this is the console log
      toast.success("User login up successfully"); // this is the toast notification
      setLoading(false);
      router.push("/profile"); // this is the router push
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong"); // this is the toast notification
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
    <div className="flex flex-col space-y-6 p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-28">
      <h1 className="text-3xl font-semibold text-center text-black">Sign Up</h1>
      <hr />
      <input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform focus:scale-105 text-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform focus:scale-105 text-black"
      />
      <button
        disabled={buttonDisabled || loading}
        onClick={Login}
        className={`p-4 rounded-lg text-white transition duration-300 ease-in-out transform ${
          buttonDisabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:scale-105"
        }`}
      >
        {loading ? "Loading..." : "Login Up"}
      </button>

      <Link href="/signup" className="text-black flex  justify-center">
        Go to Signup{" "}
      </Link>
    </div>
  );
}

export default LoginPage;
