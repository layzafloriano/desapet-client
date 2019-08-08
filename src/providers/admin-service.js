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

  getShowCases = () => {
    return this.service.get('/all-active-shopwindows')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

  showCaseNotOnDisplay = (id) => {
    return this.service.get(`/window-not-on-display/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }
  
  showCaseOnDisplay = (id) => {
    return this.service.get(`/window-on-display/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }
  
  addToShowCase = (ad) => {
    return this.service.post(`/add-ad-to-window/${ad}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

}

export default AdminService;