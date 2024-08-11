import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../Component/HomeLayout/HomeLayout';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Navbar from '../Component/Navbar/Navbar';
import NotFound from '../Component/NotFound/NotFound';
import { PrivateDashboradRoute } from './PrivateRoute';
import Dashboard from '../Component/Dashboard/Dashboard';
import AboutProject from '../Component/AboutProject/AboutProject';

const Router = () => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [role, setrole] = useState("");
  const [userId, setuserId] = useState("");
  useEffect(() => {
    setuserId(localStorage.getItem("userId"));
    setrole(localStorage.getItem("role"));
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar isLoggedin={isLoggedin} setisLoggedin={setisLoggedin} role={role} />,
      children: [
        {
          index: true,
          element: <Register />,
        },
        {
          path: "signin",
          element: <Login setisLoggedin={setisLoggedin} />,
        },
        {
          path: "dashboard",
          element: (
            <PrivateDashboradRoute isLoggedin={isLoggedin} role={role}>
              <Dashboard userId={userId} />
            </PrivateDashboradRoute>
          ),
        },
        {
          path: "home-page",
          element: <HomeLayout userId={userId} />,
        },
        {
          path: "about-project",
          element: <AboutProject />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router;
