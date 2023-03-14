import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from '../../factories/EvaluationRequest';
import unsuccessSchema from 'schemas/evaluation-requests/delete/unsuccess';

describe('Delete Evaluation Request', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully', async () => {
    const res = await request
      .delete(`evaluation_requests/${evaluation.evaluationId}`)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty('content-type', 'application/json');
    expect(res.status).toBe(204);
    expect(res.body).toBe('');
  });

  test('try to delete non-existent id', async () => {
    const res = await request
      .delete(`evaluation_requests/0001`)
      .set('Authorization', 'Bearer ' + client.accessToken);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(validate.jsonSchema(res.body, unsuccessSchema)).toBeTrue();
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Error');
  });

  // test('expired token', async () => {
  //   const res = await request
  //     .delete(`evaluation_requests/${evaluation.evaluationId}`)
  //     .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

  //   expect(res.headers).toHaveProperty(
  //     'content-type',
  //     'application/json; charset=utf-8'
  //   );
  //   expect(res.status).toBe(401);
  //   expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBeTrue();
  // });
});
