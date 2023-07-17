import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const RutaPrivada = ({ roles }) => {
  const { usuario } = useContext(UserContext);
  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(usuario.RolID)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RutaPrivada;
