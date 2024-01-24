// import React from 'react'
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'

const UpdatePhoto = ({url}) => {
  // const [image, setImage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let file = e.target.files[0]
      let formData = new FormData()
      formData.append('file', file)

      const { data } = await axios.patch(
        `${url}/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });

      // console.log(e.target.files[0])
    } catch (error) {
      console.log(error)
    }
  }
   
  return (
    <>
      <form  className=" h-screen grid px-10 grid-cols-6 gap-6" action="">
        <div className="col-span-6 pt-8 ">
          <label
            htmlFor="FirstName"
            className="block text-6xl  font-bold text-black">
            Edit Avatar
          </label>

          <div className="max-w-3xl h-[400px] mt-12  rounded-lg border-2 border-dashed flex items-center justify-center">
            <label
              htmlFor="file"
              className="cursor-pointer text-center p-4 md:p-8">
              <svg
                className="w-10 h-10 mx-auto"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                Click to{" "}
                <span className="font-medium text-indigo-600">
                  Upload your file
                </span>{" "}
                or drag and drop your file here
              </p>
            </label>
            <input id="file" type="file" className="hidden" onChange={handleSubmit}/>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePhoto;

//mt-8  grid grid-cols-6 gap-6
