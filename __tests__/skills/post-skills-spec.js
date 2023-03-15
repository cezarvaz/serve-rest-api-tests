import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skills/post/success';
import skills from 'factories/Skills';
import fakerBr from 'faker-br';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

describe('Create skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
    await skills.getSkillGroup();
  });

  let randomNumber;

  beforeEach(async () => {
    randomNumber = fakerBr.random.number({ max: 999999999999 });
  });

  test('successfully with multiple positions', async () => {
    const res = await request
      .post('skills')
      .send(
        skills.postPayload(randomNumber, skills.positionIdList, skills.groupId)
      )
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('successfully with one position', async () => {
    const res = await request
      .post('skills')
      .send(
        skills.postPayload(
          randomNumber,
          skills.positionIdList[0],
          skills.groupId
        )
      )
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('successfully without any position', async () => {
    let emptyArray = [];
    const res = await request
      .post('skills')
      .send(skills.postPayload(randomNumber, emptyArray, skills.groupId))
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('unsuccessfully with empty name', async () => {
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = '';

    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccessfully with null name', async () => {
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = null;
    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  test('unsuccessfully with invalid name', async () => {
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = '____';
    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      'O nome da competências deverá conter pelo menos uma letra do alfabeto.'
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
        .send(
          skills.postPayload(
            randomNumber,
            skills.positionIdList,
            skills.groupId
          )
        )
        .set('Authorization', token);

      expect(res.headers).toHaveProperty('content-type', 'application/json');
      expect(res.status).toBe(statusCode);
      expect(res.body.error.message).toBe(message);

      expect(validate.jsonSchema(res.body, errorSchema)).toBeTrue();
    }
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
        .send(
          skills.postPayload(
            randomNumber,
            skills.positionIdList,
            skills.groupId
          )
        )
        .set('Authorization', token);

      expect(res.headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8'
      );
      expect(res.status).toBe(401);
      expect(res.body.errors).toBe('decoding error');

      expect(validate.jsonSchema(res.body, simpleErrorSchema)).toBeTrue();
    }
  );
});
