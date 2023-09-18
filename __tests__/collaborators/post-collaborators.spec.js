import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import successSchema from 'schemas/collaborators/post-collaborators';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import simpleErrorSchema from 'schemas/errors/simple-error';

let payloadDepartments, payloadUnits, payloadPositions;
describe('Post collaborators', () => {
  beforeAll(async () => {
    await client.auth();

    payloadDepartments = {
      collaborator: {
        department_ids: [81273],
      },
    };

    payloadUnits = {
      collaborator: {
        business_unit_id: [4861],
      },
    };

    payloadPositions = {
      collaborator: {
        position_ids: [181842, 183227],
      },
    };
  });

  test('successfully departments', async () => {
    const { status, body } = await request
      .post('collaborators/post_index')
      .send(payloadDepartments)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(status).toBe(200);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  test('successfully Units', async () => {
    const { status, body } = await request
      .post('collaborators/post_index')
      .send(payloadUnits)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(status).toBe(200);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  test('successfully Positions', async () => {
    const { status, body } = await request
      .post('collaborators/post_index')
      .send(payloadPositions)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(status).toBe(200);
    expect(validate.jsonSchema(body, successSchema)).toBeTrue();
  });

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${401}     | ${'decoding error'}
  ${null}                     | ${'a null'}            | ${401}     | ${'decoding error'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'decoding error'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .post('collaborators/post_index')
        .send(payloadDepartments)
        .set('Authorization', token);
      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(body.errors).toBe(message);
      expect(status).toBe(statusCode);
      expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
    },
  );
});
