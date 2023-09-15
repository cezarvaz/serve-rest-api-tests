import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from 'factories/EvaluationRequest';
import postEvaluationAverageSchema from 'schemas/evaluation-average/post-evaluation-average';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Request Evaluation averages', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully with skills', async () => {
    const { status, body, headers } = await request
      .post(`evaluation_averages/skills?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty('content-type');
    expect(status).toBe(200);
    expect(body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.',
    );
    expect(validate.jsonSchema(body, postEvaluationAverageSchema)).toBeTrue();
  });

  test('successfully with positions', async () => {
    const { status, body, headers } = await request
      .post(`evaluation_averages/positions?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.postPayload());

    expect(headers).toHaveProperty('content-type');
    expect(status).toBe(200);
    expect(body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.',
    );
    expect(validate.jsonSchema(body, postEvaluationAverageSchema)).toBeTrue();
  });

  test('successfully with departments', async () => {
    const { status, body, headers } = await request
      .post(`evaluation_averages/departments?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(evaluation.postPayload());

    expect(headers).toHaveProperty('content-type');
    expect(status).toBe(200);
    expect(body.message).toBe(
      'Em breve enviaremos o relatório CSV para o seu e-mail.',
    );
    expect(validate.jsonSchema(body, postEvaluationAverageSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .post(`evaluation_averages/${id}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(statusCode);
    expect(body.errors.message).toBe(message);
    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
  });

  each`
  type                |token                       | scenario               | statusCode | message
  ${'skills'}         |${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${'skills'}         |${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${'skills'}         |${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${'skills'}         |${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${'skills'}         |${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}

  ${'departments'}    |${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${'departments'}    |${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${'departments'}    |${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${'departments'}    |${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${'departments'}    |${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  
  ${'positions'}      |${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${'positions'}      |${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${'positions'}      |${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${'positions'}      |${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${'positions'}      |${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $type $scenario authentication token',
    async ({ type, token, statusCode, message }) => {
      const { status, body, headers } = await request
        .post(`evaluation_averages/${type}?request_report=true`)
        .set('Authorization', token);
      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(body.errors).toBe(message);
      expect(status).toBe(statusCode);
      expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
    },
  );
});
