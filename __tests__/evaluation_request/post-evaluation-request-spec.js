import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from '../../factories/EvaluationRequest';
import successSchema from 'schemas/evaluation_requests/put/success';
import unsuccessSchema from 'schemas/evaluation_requests/delete/unsuccess';

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
    // expect(res.headers).toHaveProperty(
    //   'content-type',
    //   'application/json; charset=utf-8'
    // );
    expect(res.status).toBe(204);
    // expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });
});
