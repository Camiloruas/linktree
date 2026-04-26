import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Networks } from "./pages/networks";
import { Admin } from "./pages/admin";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/networks",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
]);

export { router };
