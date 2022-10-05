import request from 'config/request';
import client from 'helpers/AuthClient';

beforeAll(async () => {
  await client.auth();
});

class Evaluations {
  async getEvaluationList() {
    const res = await request
      .get('evaluation_requests')
      .set('Authorization', 'Bearer ' + client.accessToken)
      .expect(200);

    let fistEvaluationId = res.body.data[0].id;
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
}

export default new Evaluations();
