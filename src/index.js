import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { PageAbout } from "./pages/About";
import { PageHome } from "./pages/Home";
import { AuthProvider } from "./api/context/auth";
import { PageCreateMopik } from "./pages/CreateMopik";
import { PageProfile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/about",
    element: <PageAbout />,
  },
  {
    path: "/create-mopik",
    element: <PageCreateMopik />
  },
  {
    path: "/:nemoid",
    element: <PageProfile />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
