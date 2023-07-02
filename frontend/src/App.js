import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Categorias from './paginas/principal/Categorias';
import Index from './paginas/principal/Index';
import QuienesSomos from './paginas/principal/Quienes_somos';
import Contactanos from './paginas/principal/Contactanos';
import IniciarSesion from './paginas/principal/Iniciar_sesion';
import CrearCuenta from './paginas/principal/Crear_cuenta';
import Pago from './paginas/principal/Pago';
import Listas from './paginas/principal/Listas';
import Detalles from './paginas/principal/Detalles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/quienes_somos" element={<QuienesSomos />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/iniciar" element={<IniciarSesion />} />
        <Route path="/crear" element={<CrearCuenta />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/lista/:id" element={<Listas />} />
        <Route path="/detalles/:id" element={<Detalles />} /> { }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
