import axios from 'axios';

class AdminService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  // signup = (username, password) => {
  //   return this.service.post('/signup', {username, password})
  //   .then(response => response.data)
  //   .catch(err => Promise.reject(err.response.data))
  // }
  
  getModeration = () => {
    return this.service.get('/moderation')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

}

export default AdminService;