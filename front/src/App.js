import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Edit from './components/Edit';
import { Navbar } from './components/Navbar';
import Login from './components/Login';
import Cookies from 'universal-cookie'
import { AuthConsumer } from './context/AuthContext';

function App() {
  const cookie = new Cookies();
  const {isAuth} = AuthConsumer();

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={isAuth ?  <Add /> : <Navigate to="/" /> } />
          <Route path='/:id' element={isAuth ? <Edit /> : <Navigate to="/" />} />
          <Route path='/login' element={ isAuth ? <Navigate to="/" /> : <Login />  } />
          <Route path='/register' element={ isAuth ? <Navigate to="/" /> : <Edit />} />
        </Routes>
      </Router>
  );
}

export default App;
