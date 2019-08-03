import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewAdd from './components/ad/NewAdd';
import Navbar from './components/navbar/Navbar'
import ProtectedRoute from './components/auth/protected-route';
import AuthService from './components/providers/auth-service';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }



  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path="/novo-anuncio" component={NewAdd}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/novo-anuncio' component={NewAdd} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
          </Switch>
        </div>
      );
    }
  }

  // render() {
  //   return (
  //     <div className="App">
  //         <Navbar userInSession={this.state.loggedInUser}/>
  //         <Switch>
  //           {/* <Route exact path="/" component={HomePage}/> */}
  //           {/* <Route exact path="/signup" component={Signup}/> */}
  //           {/* <Route exact path="/login" component={Login}/> */}
  //           <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
  //           <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
  //           <Route exact path="/novo-anuncio" component={NewAdd}/>
  //       </Switch>
  //     </div>
  //   );
  // }
}

export default App;
