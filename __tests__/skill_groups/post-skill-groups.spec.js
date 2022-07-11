import request from 'config/request';
import client from 'helper/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import postGroupCriteriaSchema from 'schemas/skill_groups/post/post-group-criteria';
import errorTokenSchema from 'schemas/skill_groups/post/error_token';
import errorExistingNameSchema from 'schemas/skill_groups/post/error_existing_name';
import fakerBr from 'faker-br';

let payload, postedGroupCriteria;

const number = fakerBr.random.number({ max: 5000 });

describe('Create group criteria', () => {
  beforeAll(async () => {
    await client.auth();
  });
  beforeEach(() => {
    payload = {
      skill_group: {
        name: number + '_Teste_API',
      },
    };
  });
  test('successfully', async () => {
    postedGroupCriteria = payload.skill_group.name;
    const res = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.type).toBe('skill_groups');
    expect(res.body.data.attributes.name).toBe(postedGroupCriteria);
    expect(res.body.data.attributes.external_id).toBe(null);
    expect(res.body.data.attributes.archived).toBe(false);
    expect(res.body.data.attributes.created_at).toBeDefined();
    expect(res.body.data.attributes.updated_at).toBeDefined();
    expect(validate.jsonSchema(res.body, postGroupCriteriaSchema)).toBe(true);
  });
  test('unsuccefully due to the same name as before', async () => {
    payload.skill_group.name = postedGroupCriteria;
    const res = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      'Já existe um grupo de competências com este nome.'
    );
    expect(validate.jsonSchema(res.body, errorExistingNameSchema)).toBe(true);
  });
  test('expired token', async () => {
    const res = await request
      .post('skill_groups')
      .send(payload)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(res.body.errors).toBe('decoding error');
    expect(validate.jsonSchema(res.body, errorTokenSchema)).toBe(true);
  });
});