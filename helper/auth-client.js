import supertest from "supertest";
import { SIGNED_USER } from "utils/constants";

class AuthClient {
  async auth() {
    const res = await supertest("https://homol.system.solides.com/en/api/v2/")
      .post("authentications")
      .send(SIGNED_USER)
      .type("form")
      .expect(200);

    this.accessToken = res.body.access_token;
  }
}

export default new AuthClient();
