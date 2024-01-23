// import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
// import toast, { Toaster } from 'react-hot-toast';

const Sidebar = () => {
  const users = [
    { id: 1, name: 'John Doe', profilePic: 'user1.jpg' },
    { id: 2, name: 'Jane Smith', profilePic: 'user2.jpg' },
    { id: 3, name: 'Bob Johnson', profilePic: 'user3.jpg' },
    { id: 4, name: 'Alice Williams', profilePic: 'user4.jpg' },
  ];

  return (
    <div className="flex flex-col w-64 max-md:hidden bg-gray-50">
      <div className="flex items-center justify-center h-28  ">
        <span className="text-4xl text-transparent bg-gradient-to-r from-blue-700 to-pink-400 bg-clip-text font-extrabold ">ChitChat</span>
      </div>
      <div className="py-7 px-5">
        <div className="flex pb-10 justify-between">
          <Link to={'/posting'} className="text-blue-500 hover:text-blue-700 font-semibold">
          <Icon className='size-10' icon="zondicons:add-solid" />
          </Link>
          <Link to={'/updatePhoto'} className="text-blue-500 hover:text-blue-700 font-semibold">
          <Icon className='size-10' icon="icon-park-outline:down-picture" />
          </Link>
          <Link to={'/updateStatus'} className="text-blue-500 hover:text-blue-700 font-semibold">
          <Icon className='size-10' icon="mdi:update" />
          </Link>
          {/* <h1>P</h1>
            <h1>H</h1> */}
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Online Users</h2>
        {users.map((user) => (
          <Link
            to={`/chat/1`}
            className="flex items-center mb-4 hover:bg-gray-100 transition-colors rounded-lg p-2"
            key={user.id}
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-gray-800">{user.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;