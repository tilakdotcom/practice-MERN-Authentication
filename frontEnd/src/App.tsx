import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/yo",
        element: <> Yoo HOO </>,
      },
    ],
  },
];

const routesForPublic = [
  {
    path: "/",
    element: <HomePage />,
  },
];
