// import React from 'react'

const UpdateStatus = () => {
  return (
    <>
      <form className="px-10 h-screen pt-14">
        <div className="flex justify-center items-center flex-col gap-8">
          <h1 className="text-6xl font-bold">Update Status</h1>
          {/* <label className="text-black text-xl font-bold" htmlFor="name">Status</label> */}
          <input
            className="w-full rounded-lg border border-gray-200 p-6 text-sm"
            placeholder="Title"
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
