import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Professores from './pages/Professores';
import Salas from './pages/Salas';
import Reservas from './pages/Reservas';
import NovaReserva from './pages/NovaReserva';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Professores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/salas" element={<Salas />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/nova-reserva" element={<NovaReserva />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;