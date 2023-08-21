import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import successSchema from 'schemas/evaluation-request/post-evaluation-request';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Create requests to generate a report or create evaluation request', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post(`evaluation_requests?request_report=true`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .post(`evaluation_requests?request_report=true`)
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
