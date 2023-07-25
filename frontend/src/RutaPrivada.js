import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const RutaPrivada = ({ roles }) => {
  const { usuario, obtenerUsuarioActual } = useContext(UserContext);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerUsuarioActual()
      .then(() => setCargando(false))
      .catch(() => setCargando(false)); // eslint-disable-next-line
  }, []);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(usuario.RolID)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RutaPrivada;
