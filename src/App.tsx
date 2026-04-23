import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Networks } from "./pages/networks";
import { Admin } from "./pages/admin";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/networks", element: <Networks /> },
  { path: "/admin/social", element: <Admin /> },
]);

export { router };
