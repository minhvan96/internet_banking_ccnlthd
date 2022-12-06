import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
