import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const usuarioAlmacenado = localStorage.getItem("usuario");
    return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
  });

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  const obtenerUsuarioActual = async () => {
    try {
      const response = await axios.get("http://localhost:8081/UsuarioActual", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      if (response.data.Estatus === "EXITOSO") {
        setUsuario(response.data.Resultado);
      }
    } catch (error) {
      console.log("Se produjo un error al obtener la información del usuario actual: ", error);
    }
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, obtenerUsuarioActual }}>
      {children}
    </UserContext.Provider>
  );
};
  