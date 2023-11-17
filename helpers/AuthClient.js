import request from 'config/request';
import { SIGNED_USER } from 'utils/constants';

class AuthClient {
  async auth() {
    const res = await request.post('login').send(SIGNED_USER).expect(200);

    this.accessToken = res.body.authorization;
  }
}

export default new AuthClient();
