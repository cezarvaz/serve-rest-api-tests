import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from '../../factories/EvaluationRequest';
import EXPIRED_TOKEN from 'utils/constants';
import expiredTokenSchema from 'schemas/departments/get/expired-token';

describe('Request Evaluation averages', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully with skills', async () => {
    const res = await request
      .post(`evaluation_averages/skills?request_report=true`)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CVS para o seu e-mail.'
    );
  });

  test('successfully with positions', async () => {
    const res = await request
      .post(`evaluation_averages/positions?request_report=true`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(evaluation.postPayload());
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CVS para o seu e-mail.'
    );
  });

  test('successfully with departments', async () => {
    const res = await request
      .post(`evaluation_averages/departments?request_report=true`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(evaluation.postPayload());
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CVS para o seu e-mail.'
    );
  });

  test('expired token', async () => {
    const res = await request
      .post(`evaluation_averages/departments?request_report=true`)
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
