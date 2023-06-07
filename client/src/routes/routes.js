import React from "react";

import { useRoutes } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/signIn";
import Register from "../pages/register";
import LandingPage from "../pages/landingPage";
import setAuthToken from "../utils/setAuthToken";
//
// import ImageReSizer from "../pages/Image/ImageReSizer";

// ----------------------------------------------------------------------

export default function Router() {
  const isToken = localStorage.token;
  if (isToken) {
    setAuthToken(isToken);
  }
  return useRoutes([
    { path: "/", element: isToken ? <LandingPage /> : <SignIn /> },
    { path: "/register", element: isToken ? <LandingPage /> : <Register /> },
    { path: "/home", element: <LandingPage /> },
    { path: "*", element: <h1>Not Found</h1> },
  ]);
}
