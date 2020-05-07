import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      'Client-ID kFht9UH88BqYmSx6QDsXQj7-iI04qAmb3rL7tsp1ZZM'
  }
});