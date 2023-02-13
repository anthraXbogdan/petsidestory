import { useNavigate, Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AdminContext } from "./AppContext";

export default function ProtectedRoute() {
   const navigate = useNavigate();
   const { username } = useContext(AdminContext);

   useEffect(() => {
      if (!username) {
         navigate("/login");
      }
   }, [username]);

   return <Outlet />;
}
