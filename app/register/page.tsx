"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const RegisterPage = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
 
 try{
  e.preventDefault();
  if(!state.email || !state.password ||!state.name){
    toast.error("Fill all the fields")
    return
  }
   const response = await axios.post("/api/register",state)
  const data = await response.data
 
  toast.success("Register Successfully",data.msg)
  setState({
    name: "",
    email: "",
    password: "",
  })
 }catch(error:any){
 toast.error(error?.response?.data?.msg)
 }

  }
  return (
    <><ToastContainer />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
          <form
            onSubmit={handleSubmit}
            className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0"
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                value={state.name}
                onChange={handleChange}
                id="full-name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                value={state.email}
                onChange={handleChange}
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                value={state.password}
                onChange={handleChange}
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Register
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Have an Account Already?<Link href={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
