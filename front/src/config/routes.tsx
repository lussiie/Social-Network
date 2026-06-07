import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/main/signin";
import { Signup } from "../pages/main/signup";
import { AuthLayout } from "../pages/auth/          auth-layout.tsx";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { Followers } from "../pages/auth/followers";
import { Followings } from "../pages/auth/followings";
import { Messages } from "../pages/auth/massages";
import { Posts } from "../pages/auth/posts";
import { EditProfile } from "../pages/auth/profile/EditProfile";
import { ErrorPage } from "../pages/ErrorPage.tsx";
import { Account } from "../pages/auth/account/index.tsx";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "profile/settings",
        element: <Settings />,
      },
      {
        path: "profile/followers",
        element: <Followers />,
      },
      {
        path: "profile/followings",
        element: <Followings />,
      },
      {
        path: "profile/messages",
        element: <Messages />,
      },
      {
        path: "profile/posts",
        element: <Posts />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    {
  path: "profile/view/:username",
  element: <Account />,
}
    ],
  },
]);