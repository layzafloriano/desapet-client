import axios from 'axios';

class AdService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  addAd = (title, description, price, state, city, file, category) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.set('originalname', file.name);
    formData.set('description', description);
    formData.set('title', title);
    formData.set('state', state);
    formData.set('city', city);
    formData.set('price', price);
    formData.set('category', category);
    
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

  getCategory = () => {
    return this.service.get('/categories')
    .then(response => response.data);
  }

  search = (word) => {
    return this.service.get(`/search/${word}`)
    .then(response => response.data);
  }

  internAd = (id) => {
    return this.service.get(`/ad/${id}`)
    .then(response => response.data);
  }

  myAds = () => {
    return this.service.get('/my-ads')
    .then(response => response.data);
  }

  myReservations = () => {
    return this.service.get('/my-reservations')
    .then(response => response.data);
  }

  makeReservation = (id) => {
    return this.service.post(`/make-reservation/${id}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

  checkIfOwner = (ad) => {
    return this.service.get(`/check-if-user/${ad}`)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
  }

}

export default AdService;