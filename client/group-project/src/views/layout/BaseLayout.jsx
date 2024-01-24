import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
// import Chat from "../chat"

// import React from 'react'

const BaseLayout = ({url}) => {
  return (
    <>
      <div className="md:flex max-md:flex-col ">
        <Sidebar className="max-md:hidden" url={url}/>
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
