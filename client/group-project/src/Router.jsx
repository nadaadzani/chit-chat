import { createBrowserRouter, redirect } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Chat from "./views/Chat";
import BaseLayout from "./views/layout/baseLayout";
import Login from "./views/Login";
import Post from "./views/Post";
import Posting from "./views/Posting";
import Register from "./views/Register";
import UpdatePhoto from "./views/UpdatePhoto";
import UpdateStatus from "./views/UpdateStatus";
import { io } from "socket.io-client";

const url = "http://localhost:3000";
const socket = io("http://localhost:3000", {
  autoConnect: false,
});

const Router = createBrowserRouter([
  {
    path: "/register",
    element: <Register url={url} />,
  },
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  // {
  //   path: "/",
  //   element: <Login url={url} />,
  //   loader: () => {
  //     if (localStorage.access_token) {
  //       return redirect("/");
  //     }
  //     return null;
  //   },
  // },
  {
    element: <BaseLayout socket={socket} url={url} />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Post url={url} />,
      },

      {
        path: "/chat/:id",
        element: <Chat url={url} socket={socket} />,
      },
      {
        path: "/posting",
        element: <Posting url={url} />,
      },
      {
        path: "/updatePhoto",
        element: <UpdatePhoto url={url} />,
      },
      {
        path: "/updateStatus",
        element: <UpdateStatus url={url} />,
      },
    ],
  },
]);
export default Router;
