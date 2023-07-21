import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import groupCriteria from 'factories/GroupCriteria';
import postGroupCriteriaSchema from 'schemas/skill-groups/post/post-group-criteria';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

describe('Create group criteria', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .post('skill_groups')
      .send(groupCriteria.postPayload())
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(
      groupCriteria.postPayload().skill_group.name,
    );
    expect(res.body.data.attributes.external_id).toBe(null);
    expect(res.body.data.attributes.archived).toBeFalse();
    expect(res.body.data.attributes.created_at).toBeDefined();
    expect(res.body.data.attributes.updated_at).toBeDefined();

    expect(validate.jsonSchema(res.body, postGroupCriteriaSchema)).toBeTrue();
  });

  test('unsuccefully due to the same name as before', async () => {
    const res = await request
      .post('skill_groups')
      .send(groupCriteria.postPayload())
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      'Já existe um grupo de competências com este nome.',
    );

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  each`
  token      | scenario        | statusCode | message
  ${'token'} | ${'an invalid'} | ${403}     | ${'RESOURCE Forbidden'}
  ${null}    | ${'a null'}     | ${403}     | ${'RESOURCE Forbidden'}
  ${''}      | ${'an empty'}   | ${401}     | ${'Unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const res = await request
        .post('skill_groups')
        .send(groupCriteria.postPayload())
        .set('Authorization', token);

      expect(res.headers).toHaveProperty('content-type', 'application/json');
      expect(res.status).toBe(statusCode);
      expect(res.body.error.message).toBe(message);

      expect(validate.jsonSchema(res.body, errorSchema)).toBeTrue();
    },
  );

  each`
  token                | scenario             
  ${EXPIRED_TOKEN}     | ${'an expired'}     
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const res = await request
        .post('skill_groups')
        .send(groupCriteria.postPayload())
        .set('Authorization', token);

      expect(res.headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(res.status).toBe(401);
      expect(res.body.errors).toBe('decoding error');

      expect(validate.jsonSchema(res.body, simpleErrorSchema)).toBeTrue();
    },
  );
});
