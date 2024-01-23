
import { createBrowserRouter } from "react-router-dom";
import Chat from "./views/chat";
import Login from "./views/Login";
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
    path: "/chat/1",
    element: <Chat />,
  },
]);
export default Router;
