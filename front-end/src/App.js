import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Categorias from './paginas/principal/Categorias';
import Index from './paginas/principal/Index';
import Quienes_somos from './paginas/principal/Quienes_somos';
import Contactanos from './paginas/principal/Contactanos';
import Iniciar_sesion from './paginas/principal/Iniciar_sesion';
import Crear_cuenta from './paginas/principal/Crear_cuenta';
import Pago from './paginas/principal/Pago';
import Listas from './paginas/principal/Listas';
import Detalles from './paginas/principal/Detalles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/categorias' element={<Categorias/>}></Route>
        <Route path='/quienes_somos' element={<Quienes_somos/>}></Route>
        <Route path='/contactanos' element={<Contactanos/>}></Route>
        <Route path='/iniciar' element={<Iniciar_sesion/>}></Route>
        <Route path='/crear' element={<Crear_cuenta/>}></Route>
        <Route path='/pago' element={<Pago/>}></Route>
        <Route path='/lista' element={<Listas/>}></Route>
        <Route path='/detalles' element={<Detalles/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
