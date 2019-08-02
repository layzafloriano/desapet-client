import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewAdd from './components/ad/NewAdd';
import ProtectedRoute from './components/auth/protected-route';

function App() {
  return (
    <div className="App">
        <Switch>
          {/* <Route exact path="/" component={HomePage}/> */}
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/new-add" component={NewAdd}/>
      </Switch>
    </div>
  );
}

export default App;
