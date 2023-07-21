import supertest from 'supertest';
const request = supertest(
  'https://apigwstg.solides.com.br/management/evaluation/api/',
);
export default request;
