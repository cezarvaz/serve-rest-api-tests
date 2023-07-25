import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import fakerBr from 'faker-br';
import postGroupCriteriaSchema from 'schemas/skill-groups/post/post-group-criteria';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload, nameRegistered;

describe('Create Skill Group', () => {
  beforeAll(async () => {
    await client.auth();
  });

  beforeEach(() => {
    payload = {
      skill_group: {
        name: `SkillGroup_${fakerBr.random.number({
          max: 999999999999,
        })}_criado pela automação de testes de API`,
      },
    };
  });

  test('successfully', async () => {
    nameRegistered = payload.skill_group.name;

    const { status, body, headers } = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data.id).toBeDefined();
    expect(body.data.type).toBe('skill_groups');
    expect(body.data.attributes.name).toBe(payload.skill_group.name);
    expect(body.data.attributes.external_id).toBe(null);
    expect(body.data.attributes.archived).toBeFalse();
    expect(body.data.attributes.created_at).toBeDefined();
    expect(body.data.attributes.updated_at).toBeDefined();

    expect(validate.jsonSchema(body, postGroupCriteriaSchema)).toBeTrue();
  });

  test('unsuccefully due to the same name as before', async () => {
    payload.skill_group.name = nameRegistered;

    const { status, body, headers } = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe(
      'Já existe um grupo de competências com este nome.',
    );

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
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
        .post('skill_groups')
        .send(payload)
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
        .post('skill_groups')
        .send(payload)
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
