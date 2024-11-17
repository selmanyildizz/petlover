import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"

import Login from './pages/Login';
import Dictionary from './pages/Dictionary';
import Chat from './pages/Chat' ;
import PrivateRoute from './common/privateRoute';
import Trader from './pages/Trader';
import Register from './pages/Register';


function App() {
  const isAuthenticated = true;
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/trade" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Trader} />}></Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
