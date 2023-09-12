import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class EvaluationRequest {
  async create() {
    await request
      .post(`evaluation_requests`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(this.postPayload())
      .expect(204);
  }

  async getEvaluationList() {
    const { body } = await request
      .get('evaluation_requests')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    this.evaluationId = body.data[0].id;
  }

  postPayload() {
    const payload = {
      data: {
        message: 'ready to download',
        status: 'ready',
        contents: 'http://site.com/file.pdf',
      },
    };

    return payload;
  }
}

export default new EvaluationRequest();
