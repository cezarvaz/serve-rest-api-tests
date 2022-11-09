import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from '../../factories/EvaluationRequest';
import EXPIRED_TOKEN from 'utils/constants';
import expiredTokenSchema from 'schemas/departments/get/expired-token';

describe('Create requests to generate a report or create evaluation request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully', async () => {
    const res = await request
      .post(`evaluation_requests`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(evaluation.postPayload());
    expect(res.headers).toHaveProperty('content-type', 'application/json');
    expect(res.status).toBe(204);
  });

  test('expired token', async () => {
    const res = await request
      .post(`evaluation_requests`)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN)
      .send(evaluation.postPayload());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
