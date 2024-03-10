"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data?.user;
      setUser(data);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const logout = async () => {
    try {
      const {data} = await axios.get("/api/logout");
      toast.success(data.msg)
      setUser({});
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center text-2xl ">
      <div className="card border p-5 shadow-lg">
        <h1 className=" mb-3"> Name: {user && user.name}</h1>
        <h1 className="mb-3">Email:{user && user.email}</h1>
        <div className="mb-3">
          <button onClick={logout} className="px-6 py-3 bg-indigo-500 rounded-lg text-lg text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
