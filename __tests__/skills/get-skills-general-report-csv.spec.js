import request from 'config/request';
import client from 'helpers/AuthClient';
import skill from 'factories/Skills';
import validate from 'helpers/Validate';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Get skills csv general report', () => {
  beforeAll(async () => {
    await client.auth();
    await skill.create();
  });

  test('successfully', async () => {
    const { status, headers, text } = await request
      .get('skills/general_report_csv')
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty('content-type', 'text/csv');
    expect(status).toBe(200);
    expect(text).toContain('Competência');
    expect(text).toContain('Grupo de competência');
    expect(text).toContain('Descrição');
    expect(text).toContain('Peso');
    expect(text).toContain('Cargo');
  });

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${403}     | ${'RESOURCE Forbidden'}
  ${null}                     | ${'a null'}            | ${403}     | ${'RESOURCE Forbidden'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'Unauthorized'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .get('skills/general_report_csv')
        .set('Authorization', token);
      if (token === EXPIRED_TOKEN || token === UNAUTHORIZED_TOKEN) {
        expect(headers).toHaveProperty(
          'content-type',
          'application/json; charset=utf-8',
        );
        expect(body.errors).toBe(message);
        expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
      } else {
        expect(headers).toHaveProperty('content-type', 'application/json');
        expect(body.error.message).toBe(message);
        expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
      }
      expect(status).toBe(statusCode);
    },
  );
});
