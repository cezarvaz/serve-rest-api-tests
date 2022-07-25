import request from 'config/request';
import client from 'helper/AuthClient';
import EXPIRED_TOKEN from 'utils/constants';
import validate from 'helper/Validate';
import successSchema from 'schemas/skills/list/success';
import expiredTokenSchema from 'schemas/skills/list/expired_token';
import skills from 'helper/Skills';

describe('Create skill', () => {
  beforeAll(async () => {
    await client.auth();
    await skills.getPositionList();
  });

  test('successfully', async () => {
    console.log(JSON.stringify(skills.getPositionList()));
    const res = await request
      .post('skills')
      .send(skills.postPayload())
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    // expect(res.body.data.id).toBeDefined();
    // expect(res.body.data.type).toBe('skill_groups');
    // expect(res.body.data.attributes.name).toBe(
    //   groupCriteria.postPayload().skill_group.name
    // );
    // expect(res.body.data.attributes.external_id).toBe(null);
    // expect(res.body.data.attributes.archived).toBe(false);
    // expect(res.body.data.attributes.created_at).toBeDefined();
    // expect(res.body.data.attributes.updated_at).toBeDefined();

    // expect(validate.jsonSchema(res.body, postGroupCriteriaSchema)).toBe(true);
  });
});
