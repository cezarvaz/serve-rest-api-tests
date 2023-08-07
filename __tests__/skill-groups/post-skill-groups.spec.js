import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import fakerBr from 'faker-br';
import postGroupCriteriaSchema from 'schemas/skill-groups/post-skill-groups';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Create Skill Group', () => {
  beforeAll(async () => {
    await client.auth();

    const generateUniqueName = () => {
      return `SkillGroup_${fakerBr.random.number({
        max: 999999999999,
      })}_criado pela automação de testes de API`;
    };

    payload = {
      skill_group: {
        name: generateUniqueName(),
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.data).toMatchObject({
      type: 'skill_groups',
      attributes: {
        name: payload.skill_group.name,
      },
    });
    expect(status).toBe(201);
    expect(validate.jsonSchema(body, postGroupCriteriaSchema)).toBeTrue();
  });

  test('unsuccefully due to the same name as before', async () => {
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

  test('unsuccefully due to the same name empty', async () => {
    const { status, body, headers } = await request
      .post('skill_groups')
      .send({ ...payload, skill_group: { name: '' } })
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
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
        .post('skill_groups')
        .send(payload)
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
