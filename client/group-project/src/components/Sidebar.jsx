/* eslint-disable react/prop-types */
// import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useState, useEffect } from "react";
// import toast, { Toaster } from 'react-hot-toast';

const Sidebar = ({ url }) => {
  const [data, setData] = useState([]);
  const [self, setSelf] = useState({})

  // console.log(data);

  const navigate = useNavigate();
  // const users = [
  //   { id: 1, name: "John Doe", profilePic: "user1.jpg" },
  //   { id: 2, name: "Jane Smith", profilePic: "user2.jpg" },
  //   { id: 3, name: "Bob Johnson", profilePic: "user3.jpg" },
  //   { id: 4, name: "Alice Williams", profilePic: "user4.jpg" },
  // ];

  async function fetchSelf() {
    try {
      const {data} = await axios.get(`${url}/profile`, {headers: {Authorization: `Bearer ${localStorage.access_token}`}})
      setSelf(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchUsers() {
    try {
      const data = await axios.get(`${url}/users`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchSelf()
  }, []);

  return (
    <>
      <div className="flex flex-col min-w-64 h-screen  max-md:hidden bg-gray-50">
        <div className="flex items-center justify-center h-28  ">
          <Link
            to={"/"}
            className="text-4xl text-transparent bg-gradient-to-r from-blue-700 to-pink-400 bg-clip-text font-extrabold ">
            ChitChat
          </Link>
        </div>
        <div className="py-7 px-5">
          <div className="flex pb-10 justify-between">
            <Link
              to={"/posting"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="zondicons:add-solid" />
            </Link>
            <Link
              to={"/updatePhoto"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="icon-park-outline:down-picture" />
            </Link>
            <Link
              to={"/updateStatus"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="mdi:update" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                navigate("/login");
              }}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="icon-park-outline:logout" />
            </button>
            {/* <h1>P</h1>
            <h1>H</h1> */}
          </div>

          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          {data.map((user) => (
            <Link
              to={`/chat/${user.id}`}
              className={user.id === self.id ? "hidden": "flex items-center mb-4 hover:bg-gray-100 transition-colors rounded-lg p-2"}
              key={user.id}>
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-800">{user.username}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* NAV MOBILE */}
      <div className="  flex px-3   pt-5 md:hidden">
        <div className="flex   gap-2">
          <div>
            <Link
              to={"/"}
              className="text-3xl text-transparent bg-gradient-to-r from-blue-700 to-pink-400 bg-clip-text font-extrabold ">
              ChitChat
            </Link>
          </div>
          <div className="flex pb-10 px-10 gap-2 ">
            {/* <p>chitChat</p> */}
            <Link
              to={"/posting"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="zondicons:add-solid" />
            </Link>
            <Link
              to={"/updatePhoto"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="icon-park-outline:down-picture" />
            </Link>
            <Link
              to={"/updateStatus"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="mdi:update" />
            </Link>
            <Link
              to={"/chat/1"}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="bx:chat" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                navigate("/login");
              }}
              className="text-blue-500 hover:text-blue-700 font-semibold">
              <Icon className="size-10" icon="icon-park-outline:logout" />
            </button>
            {/* <h1>P</h1>
            <h1>H</h1> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
