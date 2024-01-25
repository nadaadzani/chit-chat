// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { RouterProvider } from "react-router-dom";
import PostContext from "./context/PostContext";
import Router from "./Router";
// import Chat from "./views/chat"
// import Login from "./views/Login"
// import Register from "./views/Register"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <>
        <PostContext>
          <RouterProvider router={Router} />
        </PostContext>
      </>
    </>
  );
}

export default App;
