import React from 'react';
import Provider from './context/rootContext';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './pages/login/login';
import Logout from './pages/login/logout';
import HomePage from './pages/home/home';
import './App.scss';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/logout' component={Logout} />
      </BrowserRouter>
    </Provider>
  );
}


export default App;
