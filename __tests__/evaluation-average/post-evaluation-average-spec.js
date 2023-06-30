import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import postEvaluationAverageSchema from 'schemas/evaluation-average/post/post-evaluation-average';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Request Evaluation averages', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully with skills', async () => {
    const res = await request
      .post(`evaluation_averages/skills?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.'
    );

    expect(
      validate.jsonSchema(res.body, postEvaluationAverageSchema)
    ).toBeTrue();
  });

  test('successfully with positions', async () => {
    const res = await request
      .post(`evaluation_averages/positions?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.postPayload());

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.'
    );

    expect(
      validate.jsonSchema(res.body, postEvaluationAverageSchema)
    ).toBeTrue();
  });

  test('successfully with departments', async () => {
    const res = await request
      .post(`evaluation_averages/departments?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.postPayload());

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.'
    );

    expect(
      validate.jsonSchema(res.body, postEvaluationAverageSchema)
    ).toBeTrue();
  });

  each`
  token                | scenario
  ${'token'}           | ${'an invalid'}
  ${null}              | ${'a null'}
  ${''}                | ${'an empty'}
  ${EXPIRED_TOKEN}     | ${'an expired'}
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const res = await request
        .post(`evaluation_averages/skills?request_report=true`)
        .set('Authorization', token);

      expect(res.headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8'
      );
      expect(res.status).toBe(401);
      expect(res.body.errors).toBe('decoding error');

      expect(validate.jsonSchema(res.body, simpleErrorSchema)).toBeTrue();
    }
  );
});
