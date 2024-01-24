/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import React from 'react'

const UpdateStatus = ({ url }) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${url}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      Swal.fire({
        // icon:'success',
        title: "Success update status!",
        width: 600,
        padding: "3.5em",
        color: "white",
        timer: 1000,
        background:
          "#fff url(https://i.pinimg.com/474x/9a/5b/eb/9a5beb996e2113870cb199a95eb6b947.jpg)",
        backdrop: `
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error bang",
        // text: error.response.data.error,
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-10 max-md:px-5  h-screen md:pt-24 pt-8">
        <div className="flex justify-center items-center flex-col gap-8">
          <h1 className="text-5xl font-bold">Update Status</h1>
          {/* <label className="text-black text-xl font-bold" htmlFor="name">Status</label> */}
          <input
            className="w-full rounded-lg border border-gray-200 p-6 text-xl"
            placeholder="Status"
            // value={status}
            onChange={(e) => {
              e.preventDefault();
              setStatus(e.target.value);
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
