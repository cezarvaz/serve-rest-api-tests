import request from 'config/request';
import client from 'helpers/AuthClient';
import skillGroup from 'factories/SkillGroups';
import validate from 'helpers/Validate';
import fakerBr from 'faker-br';
import successSchema from 'schemas/skill-groups/put-skill-groups.js';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import errorsSchema from 'schemas/errors/errors';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Get Skill Groups by id', () => {
  beforeAll(async () => {
    await client.auth();
    await skillGroup.create();

    const generateUniqueName = () => {
      return `SkillGroup_${fakerBr.random.number({
        max: 999999999999,
      })}_criado pela automação de testes de API`;
    };

    payload = {
      skill_group: {
        name: generateUniqueName(),
        archived: true,
      },
    };
  });

  test('successfully', async () => {
    const { status, body, headers } = await request
      .put(`skill_groups/${skillGroup.id}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(body.data).toMatchObject({
      id: skillGroup.id,
      type: 'skill_groups',
      attributes: {
        name: payload.skill_group.name,
        archived: true,
      },
    });
    expect(status).toBe(202);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  id                        | scenario               | statusCode | message
  ${'999999999999'}         | ${'invalid id'}        | ${404}     | ${'Não pode ser mostrado'}
  ${'nonexistentent'}       | ${'string id'}         | ${404}     | ${'Não pode ser mostrado'}
  ${null}                   | ${'null id'}           | ${404}     | ${'Não pode ser mostrado'}
  `.test('unsuccessfully $scenario', async ({ id, statusCode, message }) => {
    const { status, body, headers } = await request
      .put(`skill_groups/${id}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(statusCode);
    expect(body.errors.message).toBe(message);
    expect(validate.jsonSchema(body, errorsSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same name as before', async () => {
    const { status, body, headers } = await request
      .put(`skill_groups/${skillGroup.id - 1}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser atualizado');
    expect(body.error.name[0]).toBe(
      'Já existe um grupo de competências com este nome.',
    );
    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccessfully due to the same name empty', async () => {
    const { status, body, headers } = await request
      .put(`skill_groups/${skillGroup.id - 1}`)
      .send({ ...payload, skill_group: { name: '' } })
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser atualizado');
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
        .put(`skill_groups/${skillGroup.id}`)
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
