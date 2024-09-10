import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/insurance',
});

export const getNonLifeInsuranceCompanies = () => {
  return api.get('/non-life');
};

export const getLifeInsuranceCompanies = () => {
  return api.get('/life');
};

export const compareInsuranceProducts = (data) => {
  return api.post('/compare', data);
};

