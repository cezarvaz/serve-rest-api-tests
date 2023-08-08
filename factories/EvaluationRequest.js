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
      .get('evaluation_requests/')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .expect(200);

    let fistEvaluationId = body.data[0].id;
    this.evaluationId = parseInt(fistEvaluationId);
  }

  putPayload() {
    const payload = {
      evaluation_request: {
        expired_at: '2099-01-31',
        resend: true,
      },
    };

    return payload;
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
