import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Edit from './components/Edit';
import { Navbar } from './components/Navbar';
import Login from './components/Login';
import { AuthConsumer } from './context/AuthContext';
import Register from './components/Register';

function App() {
  const {isAuth, role} = AuthConsumer();

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={isAuth && role === 'admin' ?  <Add /> : <Navigate to="/" /> } />
          <Route path='/:id' element={isAuth && role === 'admin' ? <Edit /> : <Navigate to="/" />} />
          <Route path='/login' element={ isAuth ? <Navigate to="/" /> : <Login />  } />
          <Route path='/register' element={ isAuth ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </Router>
  );
}

export default App;
