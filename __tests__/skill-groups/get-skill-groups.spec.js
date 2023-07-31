import request from 'config/request';
import client from 'helpers/AuthClient';
import skillGroup from 'factories/SkillGroups';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skill-groups/get-skill-groups';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';

describe('Get Skill Groups by id', () => {
  beforeAll(async () => {
    await client.auth();
    await skillGroup.create();
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .get('skill_groups/' + skillGroup.id)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.data.id).toBe(skillGroup.id);
    expect(body.data.type).toBe('skill_groups');
    expect(body.data.attributes.created_at).toBeDefined();
    expect(body.data.attributes.updated_at).toBeDefined();

    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  test('nonexistentent id', async () => {
    const { status, body, headers } = await request
      .get('skill_groups/nonexistent_id')
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

  test('invalid id', async () => {
    const { status, body, headers } = await request
      .get('skill_groups/999999999999')
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
  token      | scenario        | statusCode | message
  ${'token'} | ${'an invalid'} | ${403}     | ${'RESOURCE Forbidden'}
  ${null}    | ${'a null'}     | ${403}     | ${'RESOURCE Forbidden'}
  ${''}      | ${'an empty'}   | ${401}     | ${'Unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .get('skill_groups/' + skillGroup.id)
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
        .get('skill_groups/' + skillGroup.id)
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
