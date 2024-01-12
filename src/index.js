import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageAbout } from "./pages/About";
import { PageHome } from "./pages/Home";
import { AuthProvider } from "./api/context/auth";
import { PageAuth } from "./pages/Auth";
import { PageProfile } from "./pages/Profile";
import { PageNotes } from "./pages/Notes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import { PagePrivacy } from "./pages/Privacy";

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
    path: "/auth",
    element: <PageAuth />
  },
  {
    path: "/mopiks",
    element: <PageHome />
  },
  {
    path: "/privacy",
    element: <PagePrivacy />
  },
  {
    path: "/:nemo",
    element: <PageProfile />
  },
  {
    path: "*",
    element: <p>Not found</p>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
