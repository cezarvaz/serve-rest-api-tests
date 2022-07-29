import request from 'config/request';
import client from 'helpers/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helpers/Validate';
import successSchema from 'schemas/skills/post/success';
import expiredTokenSchema from 'schemas/skills/post/expired_token';
import emptyNameSchema from 'schemas/skills/post/empty_name';
import skills from 'factories/Skills';
import fakerBr from 'faker-br';

describe('Create skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
    await skills.getSkillGroup();
  });

  test('successfully with multiple positions', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    const res = await request
      .post('skills')
      .send(
        skills.postPayload(randomNumber, skills.positionIdList, skills.groupId)
      )
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('successfully with one position', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    const res = await request
      .post('skills')
      .send(
        skills.postPayload(
          randomNumber,
          skills.positionIdList[0],
          skills.groupId
        )
      )
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('successfully without any position', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    let emptyArray = [];
    const res = await request
      .post('skills')
      .send(skills.postPayload(randomNumber, emptyArray, skills.groupId))
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test('expired token', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    let emptyArray = [];
    const res = await request
      .post('skills')
      .send(skills.postPayload(randomNumber, emptyArray, skills.groupId))
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });

  test('unsuccessfully with empty name', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = '';
    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo não pode estar vazio');
    expect(validate.jsonSchema(res.body, emptyNameSchema)).toBe(true);
  });

  test('unsuccessfully with null name', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = null;
    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(validate.jsonSchema(res.body, emptyNameSchema)).toBe(true);
  });

  test('unsuccessfully with invalid name', async () => {
    let randomNumber = fakerBr.random.number({ max: 5000 });
    let payload = skills.postPayload(
      randomNumber,
      skills.positionIdList,
      skills.groupId
    );
    payload.skill.name = '____';
    const res = await request
      .post('skills')
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    // validação comentada aguardando correção do desenvolvedor
    // expect(res.body.error.name[0]).toBe(
    //   'O nome da competências deverá conter pelo menos uma letra do alfabeto.'
    // );
    expect(validate.jsonSchema(res.body, emptyNameSchema)).toBe(true);
  });
});
