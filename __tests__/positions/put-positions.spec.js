import request from 'config/request';
import client from 'helpers/AuthClient';
import skills from 'factories/Skills';
import positions from 'factories/Positions';
import validate from 'helpers/Validate';
import successSchema from 'schemas/positions/put/success';
import unsuccessSchema from 'schemas/positions/put/unsuccessful';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';

describe('Update Position', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getDataToPut();
    await skills.getPositionList();
    await skills.getList();
  });

  test('successfully with one position', async () => {
    const res = await request
      .put(`positions/${skills.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(positions.putPayload(skills.data.skillId));

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(skills.positionIdList[0]);
    expect(res.body.data.type).toBe('positions');
    expect(res.body.data.relationships.skills.data[0].type).toBe('skills');

    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('successfully with a list of skills', async () => {
    let payload = positions.putPayload(skills.skillsList);
    payload.position.skill_ids = skills.skillsList;

    const res = await request
      .put(`positions/${skills.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(skills.positionIdList[0]);
    expect(res.body.data.type).toBe('positions');
    expect(res.body.data.relationships.skills.data[0].id).toBe(
      skills.data.skillId
    );
    expect(res.body.data.relationships.skills.data[0].type).toBe('skills');

    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('unsuccefully with an empty list of skills', async () => {
    const res = await request
      .put(`positions/${skills.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(positions.putPayload());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');

    expect(validate.jsonSchema(res.body, unsuccessSchema)).toBeTrue();
  });

  test('unsuccefully with an invalid skills', async () => {
    let invalid_skill = 'skill-invalida-para-teste';

    const res = await request
      .put(`positions/${skills.positionIdList[0]}`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(positions.putPayload(invalid_skill));
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser atualizado');
    expect(res.body.error.skill_ids[0]).toBe(
      `A ${invalid_skill} é uma competência inválida.`
    );

    expect(validate.jsonSchema(res.body, unsuccessSchema)).toBeTrue();
  });

  each`
  token                | scenario            
  ${'token'}           | ${'an invalid'}
  ${null}              | ${'a null'}
  ${''}                | ${'an empty'}
  ${EXPIRED_TOKEN}     | ${'an expired'}
  ${UNAUTHORIZED_TOKEN}| ${'an unauthorized'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token }) => {
      const res = await request
        .put(`positions/${skills.positionIdList[0]}`)
        .send(positions.putPayload(skills.data.skillId))
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
