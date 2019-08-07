import axios from 'axios';

class AdminService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  getModeration = () => {
    return this.service.get('/moderation')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
    
  }
 
  approveMe = (id) => {
    return this.service.get(`/approve-me/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

  rejectMe = (id) => {
    return this.service.get(`/reject-me/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

}

export default AdminService;