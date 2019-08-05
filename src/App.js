import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewAd from './components/ad/NewAd';
import InternAd from './components/ad/Ad';
import Search from './components/search/Search';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './components/auth/protected-route';
import AuthService from './providers/auth-service';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: será calculada com base em palette.primary.main,
      main: '#ff4400',
      // dark: será calculada com base em palette.primary.main,
      // contrastText: será calculada para contrastar com palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: será calculada com base em palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: irá usar a cor padrão
  },
});

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
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch>
              <Route exact path='/' render={() => <Home getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} exact path='/novo-anuncio' component={NewAd} />
              <Route exact path='/anuncio' render={() => <InternAd />} />
              <Route exact path='/buscar' render={() => <Search />} />
            </Switch>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} />
            <Switch>
              <Route exact path='/' render={() => <Home getUser={this.getTheUser}/>}/>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route exact path='/anuncio' render={() => <InternAd />} />
              <Route exact path='/buscar' render={() => <Search />} />
              <InternAd />
            </Switch>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

export default App;
