import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {
  ProtectedRouteForAuthentic,
  ProtectedRouteForNotAuthentic,
} from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordLinkPage from "./pages/ResetPasswordLinkPage";
import VerifyAndPasswordPage from "./pages/VerifyAndPasswordPage";

export default function App() {
  const router = createBrowserRouter([
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
    ...routesForPublic,
  ]);

  return <RouterProvider router={router} />;
}

const routesForNotAuthenticatedOnly = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRouteForNotAuthentic />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
          {
            path: "reset-password-link",
            element: <ResetPasswordLinkPage />,
          },
          {
            path: "reset-password/:token",
            element: <VerifyAndPasswordPage />,
          }
        ],
      },
    ],
  },
];

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRouteForAuthentic />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "verify-email",
            element: <VerifyEmailPage />,
          },
        ],
      },
    ],
  },
];

const routesForPublic = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      }
    ],
  },
];
