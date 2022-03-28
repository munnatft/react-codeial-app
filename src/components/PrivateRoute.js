import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { useAuth } from "../hooks";
export function PrivateRoute({ children }) {
    const auth = useAuth();
    let location = useLocation();
    console.log(location)
  
    if (auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/"  replace />;
    }
  
    return children;
  }