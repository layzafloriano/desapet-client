import axios from 'axios';

class AdService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:8000/api',
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
    // { description, title, state, city, price }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return this.service.post('/add-ad', formData, config)
    .then(response => response.data)
  }

  // upload = (image) => {
  //   return this.service.post('/upload', {image})
  //   .then(response => response.data)
  // }
}

export default AdService;