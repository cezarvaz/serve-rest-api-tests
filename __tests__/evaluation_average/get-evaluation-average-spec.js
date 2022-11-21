import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import evaluation from '../../factories/EvaluationRequest';
import EXPIRED_TOKEN from 'utils/constants';
import expiredTokenSchema from 'schemas/departments/get/expired-token';
import successSkillsSchema from 'schemas/evaluation_average/get/success-skills';
import successPositionsSchema from 'schemas/evaluation_average/get/success-positions';
import successDepartmentsSchema from 'schemas/evaluation_average/get/success-departments';

describe('List of Evaluation averages', () => {
  beforeAll(async () => {
    await client.auth();
    await evaluation.getEvaluationList();
  });

  test('successfully with skills', async () => {
    const res = await request
      .get(`evaluation_averages/skills`)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('skills');
    expect(validate.jsonSchema(res.body, successSkillsSchema)).toBe(true);
  });

  test('successfully with positions', async () => {
    const res = await request
      .get(`evaluation_averages/positions`)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('positions');
    expect(validate.jsonSchema(res.body, successPositionsSchema)).toBe(true);
  });

  test('successfully with departments', async () => {
    const res = await request
      .get(`evaluation_averages/departments`)
      .set('Authorization', 'Bearer ' + client.accessToken);
    expect(res.headers).toHaveProperty('content-type');
    expect(res.status).toBe(200);
    expect(res.body.data[1].type).toBe('departments');
    expect(validate.jsonSchema(res.body, successDepartmentsSchema)).toBe(true);
  });

  test('expired token', async () => {
    const res = await request
      .get(`evaluation_averages/departments`)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
