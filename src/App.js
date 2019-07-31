import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
        <Switch>
          {/* <Route exact path="/" component={HomePage}/> */}
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
