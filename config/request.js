import supertest from "supertest";
const request = supertest(
  "https://apigwstg.solides.com.br/performance-evaluation/api/"
);
export default request;
