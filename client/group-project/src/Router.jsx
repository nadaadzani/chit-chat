import { createBrowserRouter } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Chat from "./views/chat";
import BaseLayout from "./views/layout/baseLayout";
import Login from "./views/Login";
import Post from "./views/Post";
import Register from "./views/Register";

const Router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/posts",
        element: <Post />,
      },

      {
        path: "/chat/1",
        element: <Chat />,
      },
    ],
  },
]);
export default Router;
