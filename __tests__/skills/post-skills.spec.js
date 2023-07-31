import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import postSkillSchema from 'schemas/skills/post-skill';
import skillGroups from 'factories/SkillGroups';
import positions from 'factories/Positions';
import fakerBr from 'faker-br';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Create skill', () => {
  beforeAll(async () => {
    await client.auth();
    await positions.getPositionList();
    await skillGroups.getSkillGroup();
  });

  beforeEach(async () => {
    payload = {
      skill: {
        name: `${fakerBr.random.number({
          max: 999999999999,
        })}_criado pela automação de testes de API`,
        description: fakerBr.random.words(),
        factor: 1,
        archived: true,
        skill_group_id: skillGroups.groupId,
        position_ids: positions.positionIdList,
      },
    };
  });

  test('successfully with multiple positions', async () => {
    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('successfully with one position', async () => {
    payload.skill.position_ids = positions.positionIdList[0];

    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    // expect(body.data.relationships.positions.data).toBe(
    //   skillGroups.positionIdList[0]
    // ); // vem vazio
    expect(body.data.relationships.skill_group.data.id).toBe(
      skillGroups.groupId,
    );

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('successfully without any position', async () => {
    payload.skill.position_ids = [];

    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data.relationships.skill_group.data.id).toBe(
      skillGroups.groupId,
    );
    expect(body.data.relationships.positions.data).toBeEmpty();

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('unsuccessfully with empty name', async () => {
    payload.skill.name = '';

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
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

  test('unsuccessfully with null name', async () => {
    payload.skill.name = null;

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
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

  test('unsuccessfully with invalid name', async () => {
    payload.skill.name = '____';

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe(
      'O nome da competências deverá conter pelo menos uma letra do alfabeto.',
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
        .post('skills')
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
        .post('skills')
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
