import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
// import Chat from "../chat"

// import React from 'react'

const BaseLayout = () => {
  return (
    <>
      <div className="md:flex max-md:flex-col ">
        <Sidebar className="max-md:hidden" />
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
