import axios from 'axios';

class AdService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  addAd = (title, description, price, state, city, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.set('originalname', file.name);
    formData.set('description', description);
    formData.set('title', title);
    formData.set('state', state);
    formData.set('city', city);
    formData.set('price', price);
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return this.service.post('/add-ad', formData, config)
    .then(response => response.data);
  }

  getListState = () => {
    return this.service.get('/add-ad-state')
    .then(response => response.data);
  }

  getListCity = (stateID) => {
    return this.service.get(`/add-ad-city/${stateID}`)
    .then(response => response.data);
  }
}

export default AdService;