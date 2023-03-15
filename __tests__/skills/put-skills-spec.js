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

describe('Edit skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
    await skills.getSkillGroup();
    await skills.getDataToPut();
  });

  let payload, randomNumber;

  beforeEach(async () => {
    randomNumber = fakerBr.random.number({ max: 999999999999 });
  });

  test('successfully archived', async () => {
    payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = `${randomNumber}__editado pela automação`;
    payload.skill.archived = false;
    payload.skill.skill_group_id = skills.data.groupId;

    const res = await request
      .put(`skills/${skills.data.skillId}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('unsuccessfully with null name', async () => {
    payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = null;
    payload.skill.skill_group_id = skills.data.groupId;

    const res = await request
      .put(`skills/${skills.data.skillId}`)
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);

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
        .put(`skills/${skills.data.skillId}`)
        .send(payload)
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
        .put(`skills/${skills.data.skillId}`)
        .send(payload)
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
