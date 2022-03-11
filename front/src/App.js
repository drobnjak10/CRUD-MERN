import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Edit from './components/Edit';
import { Navbar } from './components/Navbar';
import Login from './components/Login';
import { AuthConsumer } from './context/AuthContext';
import Register from './components/Register';
import Landing from './components/Landing';
import Cookies from 'universal-cookie'

function App() {
  const {isAuth, role, auth} = AuthConsumer();
  

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/add' element={auth && role === 'admin' ?  <Add /> : <Navigate to="/" /> } />
          <Route path='/:id' element={auth && role === 'admin' ? <Edit /> : <Navigate to="/" />} />
          <Route path='/login' element={ auth ? <Navigate to="/" /> : <Login />  } />
          <Route path='/register' element={ auth ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </Router>
  );
}

export default App;
