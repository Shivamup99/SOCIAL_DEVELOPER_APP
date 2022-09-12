import React from 'react'
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
