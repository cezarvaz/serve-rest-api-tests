import supertest from "supertest";
const request = supertest(
  "http://internalalb-stg.solides.com.br/evaluation/api/"
);
export default request;
