import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  // username, password, campus, course
  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }
  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }
  logout = () => {
    return this.service.get('/logout', {})
    .then(response => response.data)
  }

  // //upload e edit
  // upload = (image) => {
  //   return this.service.post('/upload', {image})
  //   .then(response => response.data)
  // }

  edit = (username) => {
    return this.service.put('/edit', { username})
    .then(response => response.data)
  }
}

export default AuthService;