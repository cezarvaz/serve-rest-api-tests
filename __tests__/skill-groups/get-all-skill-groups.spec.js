import request from 'config/request';
import client from 'helpers/AuthClient';
import skillGroups from 'factories/SkillGroups';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skill-groups/get-all-skill-groups';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('All Skill Groups', () => {
  beforeAll(async () => {
    await client.auth();
    await skillGroups.create();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get('skill_groups')
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);

    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  token      | scenario        | statusCode | message
  ${'token'} | ${'an invalid'} | ${403}     | ${'RESOURCE Forbidden'}
  ${null}    | ${'a null'}     | ${403}     | ${'RESOURCE Forbidden'}
  ${''}      | ${'an empty'}   | ${401}     | ${'Unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .get('skill_groups')
        .set('Authorization', token);

      expect(headers).toHaveProperty('content-type', 'application/json');
      expect(status).toBe(statusCode);
      expect(body.error.message).toBe(message);

      expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
    },
  );

  each`
  token                | scenario             
  ${EXPIRED_TOKEN}     | ${'an expired'}     
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const { status, body, headers } = await request
        .get('skill_groups')
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
