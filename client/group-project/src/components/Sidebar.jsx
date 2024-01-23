import { Link } from "react-router-dom";

// import React from 'react';

const Sidebar = () => {
  const users = [
    { id: 1, name: 'John Doe', profilePic: 'user1.jpg' },
    { id: 2, name: 'Jane Smith', profilePic: 'user2.jpg' },
    { id: 3, name: 'Bob Johnson', profilePic: 'user3.jpg' },
    { id: 4, name: 'Alice Williams', profilePic: 'user4.jpg' },
  ];

  return (
    <div className="flex flex-col w-64 max-md:hidden bg-gray-200">
      <div className="flex items-center justify-center h-16 bg-blue-500 text-white">
        <span className="text-xl font-bold">ChitChat</span>
      </div>
      <div className="p-4">
        <div className="flex items-center pb-10 justify-end font-extrabold gap-7">
            <Link to={'/posts'} > Add Post</Link>
            {/* <h1>P</h1>
            <h1>H</h1> */}
        </div>
        <h2 className="text-lg font-semibold mb-2">Online Users</h2>
        {users.map((user) => (
          <Link to={'/chat/1'} className="flex items-center mb-4" key={user.id}>
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>{user.name}</span>
          </Link>
        ))}
      </div>
      {/* <button className="p-4 bg-blue-500 text-white" id="postButton">
        Post
      </button> */}
    </div>
  );
};

export default Sidebar;