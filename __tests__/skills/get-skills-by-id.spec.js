import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import getSkillsByIdSchema from 'schemas/skills/get-skills-by-id';
import skill from 'factories/Skills';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Get skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skill.create();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get(`skills/${skill.id}`)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.data.id).toBe(skill.id);
    expect(body.data.type).toBe('skills');

    expect(validate.jsonSchema(body, getSkillsByIdSchema)).toBeTrue();
  });

  each`
  id             | scenario            
  ${'a'}         | ${'an invalid'}
  ${null}        | ${'a null'}
  ${'999999999'} | ${'an inexistent'}
  `.test('should validate $scenario id', async ({ id }) => {
    const { status, body, headers } = await request
      .get(`skills/${id}`)
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
        .get(`skills/${skill.id}`)
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
