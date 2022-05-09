import request from "config/request.js";
import { SIGNED_USER } from "utils/constants";

class AuthClient {
  async auth() {
    const res = await request
      .post("user/sign-in")
      .send(SIGNED_USER)
      .expect(200);

    this.accessToken = res.body.token;
  }
}

export default new AuthClient();
