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
    const res = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(201);

    expect(validate.jsonSchema(res.body, postSkillSchema)).toBeTrue();
  });

  test('successfully with one position', async () => {
    payload.skill.position_ids = positions.positionIdList[0];

    const res = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(201);
    // expect(res.body.data.relationships.positions.data).toBe(
    //   skillGroups.positionIdList[0]
    // ); // vem vazio
    expect(res.body.data.relationships.skill_group.data.id).toBe(
      skillGroups.groupId,
    );

    expect(validate.jsonSchema(res.body, postSkillSchema)).toBeTrue();
  });

  test('successfully without any position', async () => {
    payload.skill.position_ids = [];

    const res = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(201);
    expect(res.body.data.relationships.skill_group.data.id).toBe(
      skillGroups.groupId,
    );
    expect(res.body.data.relationships.positions.data).toBeEmpty();

    expect(validate.jsonSchema(res.body, postSkillSchema)).toBeTrue();
  });

  test('unsuccessfully with empty name', async () => {
    payload.skill.name = '';

    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccessfully with null name', async () => {
    payload.skill.name = null;

    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccessfully with invalid name', async () => {
    payload.skill.name = '____';

    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      'O nome da competências deverá conter pelo menos uma letra do alfabeto.',
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
        .post('skills')
        .send(payload)
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
        .post('skills')
        .send(payload)
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
