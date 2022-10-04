import request from 'config/request';
import client from 'helpers/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helpers/Validate';
import expiredTokenSchema from 'schemas/departments/get/expired-token';
import evaluation from '../../factories/EvaluationRequest';

describe('Delete Evaluation Request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully', async () => {
    const res = await request
      .get(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'text/html; charset=UTF-8'
    );
    expect(res.status).toBe(404);
  });

  test('try to delete non-existent id ', async () => {
    const res = await request
      .get(`evaluation_requests/0001`)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'text/html; charset=UTF-8'
    );
    expect(res.status).toBe(404);
  });

  test('expired token', async () => {
    const res = await request
      .delete(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
