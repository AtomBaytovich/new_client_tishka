import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { PageAbout } from "./pages/About";
import { PageHome } from "./pages/Home";
import { AuthModule } from "./components/Auth";
import { AuthProvider } from "./api/context/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "about",
    element: <PageAbout />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <AuthModule />
    </AuthProvider>
  </React.StrictMode>
);
