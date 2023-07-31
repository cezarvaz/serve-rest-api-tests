import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
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
  });

  test('successfully with skills', async () => {
    const { status, body, headers } = await request
      .get(`evaluation_averages/skills`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.data[0].type).toBe('skills');

    expect(validate.jsonSchema(body, successSkillsSchema)).toBeTrue();
  });

  test('successfully with positions', async () => {
    const { status, body, headers } = await request
      .get(`evaluation_averages/positions`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.data[0].type).toBe('positions');

    expect(validate.jsonSchema(body, successPositionsSchema)).toBeTrue();
  });

  test('successfully with departments', async () => {
    const { status, body, headers } = await request
      .get(`evaluation_averages/departments`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.data[0].type).toBe('departments');

    expect(validate.jsonSchema(body, successDepartmentsSchema)).toBeTrue();
  });

  each`
  id             | scenario            
  ${'999999999'} | ${'an invalid'}
  ${null}        | ${'a null'}
  ${'a'}         | ${'an inexistent'}
  `.test('should validate $scenario id', async ({ id }) => {
    const { status, body, headers } = await request
      .get(`evaluation_averages/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(404);
    expect(body.errors.status).toBe(404);
    expect(body.errors.message).toBe('Não pode ser mostrado');

    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
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
      const { status, body, headers } = await request
        .get(`evaluation_averages/departments`)
        .set('Authorization', token);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(401);
      expect(body.errors).toBe('decoding error');

      expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
    },
  );
});
