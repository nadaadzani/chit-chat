import { useState } from "react";
import Swal from "sweetalert2";

// import React from 'react'

const UpdateStatus = () => {
    const [status, setStatus] = useState("")

    const handleSubmit= (e) => {
        e.preventDefault()
        setStatus(status)
        Swal.fire({
            // icon:'success',
            title: "Success update status!",
            width: 600,
            padding: "3.5em",
            color: "white",
            background: "#fff url(https://i.pinimg.com/474x/9a/5b/eb/9a5beb996e2113870cb199a95eb6b947.jpg)",
            backdrop: `
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          });
    }
  return (
    <>
      <form onSubmit={handleSubmit} className="px-10  h-screen md:pt-24 pt-8">
        <div className="flex justify-center items-center flex-col gap-8">
          <h1 className="text-6xl font-bold">Update Status</h1>
          {/* <label className="text-black text-xl font-bold" htmlFor="name">Status</label> */}
          <input
            className="w-full rounded-lg border border-gray-200 p-6 text-xl"
            placeholder="Status"
            // value={status}
            onChange={(e)=>{
                e.preventDefault()
                e.target.value
            }}
            type="text"
          />
        </div>
        <div className="pt-12 ">
          <button className=" bg-blue-600 hover:bg-blue-700 rounded-xl px-7 py-3 text-white text-xl font-semibold">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateStatus;
