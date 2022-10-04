import request from 'config/request';
import client from 'helpers/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helpers/Validate';
import expiredTokenSchema from 'schemas/departments/get/expired-token';
import evaluation from '../../factories/EvaluationRequest';
import successSchema from 'schemas/evaluation_requests/put/success';

describe('Edit Evaluation Request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully', async () => {
    const res = await request
      .put(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(evaluation.putPayload());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('try to update non-existent id ', async () => {
    const res = await request
      .put(`evaluation_requests/00001`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(evaluation.putPayload());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
  });
});
