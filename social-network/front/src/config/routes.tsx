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

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // 🔥 PARENT LAYOUT (NO PATH LIKE /profile)
  {
    element: <AuthLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
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
    ],
  },
]);