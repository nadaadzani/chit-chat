import { createBrowserRouter } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Chat from "./views/chat";
import BaseLayout from "./views/layout/baseLayout";
import Login from "./views/Login";
import Post from "./views/Post";
import Posting from "./views/Posting";
import Register from "./views/Register";
import UpdatePhoto from "./views/UpdatePhoto";
import UpdateStatus from "./views/UpdateStatus";

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
        path: "/home",
        element: <Post />,
      },

      {
        path: "/chat/1",
        element: <Chat />,
      },
      {
        path: "/posting",
        element: <Posting />,
      },
      {
        path: "/updatePhoto",
        element: <UpdatePhoto />,
      },
      {
        path: "/updateStatus",
        element: <UpdateStatus/>,
      },
    ],
  },
]);
export default Router;
