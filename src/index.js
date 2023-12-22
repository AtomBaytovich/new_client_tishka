import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageAbout } from "./pages/About";
import { PageHome } from "./pages/Home";
import { AuthProvider } from "./api/context/auth";
import { PageCreateMopik } from "./pages/CreateMopik";
import { PageProfile } from "./pages/Profile";
import { PageNotes } from "./pages/Notes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageNotes />
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
    path: "/mopiks",
    element: <PageHome />
  },
  {
    path: "/:nemoid",
    element: <PageProfile />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
