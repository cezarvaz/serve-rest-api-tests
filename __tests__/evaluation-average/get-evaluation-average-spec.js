import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import successSkillsSchema from 'schemas/evaluation-average/get/success-skills';
import successPositionsSchema from 'schemas/evaluation-average/get/success-positions';
import successDepartmentsSchema from 'schemas/evaluation-average/get/success-departments';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('List of Evaluation averages', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully with skills', async () => {
    const res = await request
      .get(`evaluation_averages/skills`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('skills');

    expect(validate.jsonSchema(res.body, successSkillsSchema)).toBeTrue();
  });

  test('successfully with positions', async () => {
    const res = await request
      .get(`evaluation_averages/positions`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('positions');

    expect(validate.jsonSchema(res.body, successPositionsSchema)).toBeTrue();
  });

  test('successfully with departments', async () => {
    const res = await request
      .get(`evaluation_averages/departments`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('departments');

    expect(validate.jsonSchema(res.body, successDepartmentsSchema)).toBeTrue();
  });

  each`
  id             | scenario            
  ${'999999999'} | ${'an invalid'}
  ${null}        | ${'a null'}
  ${'a'}         | ${'an inexistent'}
  `.test('should validate $scenario id', async ({ id }) => {
    const res = await request
      .get(`evaluation_averages/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(404);
    expect(res.body.errors.status).toBe(404);
    expect(res.body.errors.message).toBe('Não pode ser mostrado');

    expect(validate.jsonSchema(res.body, errorsSchema)).toBeTrue();
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
        .get(`evaluation_averages/departments`)
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
