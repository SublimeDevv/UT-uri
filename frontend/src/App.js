import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Categorias from "./paginas/principal/Categorias";
import Index from "./paginas/principal/Index";
import QuienesSomos from "./paginas/principal/Quienes_somos";
import Contactanos from "./paginas/principal/Contactanos";
import IniciarSesion from "./paginas/principal/Iniciar_sesion";
import CrearCuenta from "./paginas/principal/Crear_cuenta";
import Pago from "./paginas/principal/Pago";
import Listas from "./paginas/principal/Listas";
import Detalles from "./paginas/principal/Detalles";
import Dashboard from "./paginas/principal/Dashboard";
import RutaPrivada from "./RutaPrivada";
import Productos from "./paginas/principal/Productos";
import Subcategorias from "./paginas/principal/Subcategorias";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/quienes_somos" element={<QuienesSomos />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/iniciar" element={<IniciarSesion />} />
          <Route path="/crear" element={<CrearCuenta />} />
          <Route path="/etiquetas/:id/:nombre" element={<Subcategorias />} />
          <Route path="/centroturistico/:id" element={<Listas />} />
          <Route path="/centroturistico/detalles/:id/:nombre" element={<Detalles/>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<RutaPrivada roles={[1]}/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
