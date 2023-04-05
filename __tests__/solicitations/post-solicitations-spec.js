import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import solicitations from 'factories/Solicitations';
import successSchema from 'schemas/solicitations/post/success';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

describe('Create a solicitation', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(solicitations.postPayload());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(res.body.data.type).toBe('solicitations');
    expect(res.body.data.attributes.name).toBe(
      solicitations.postPayload().solicitation.name
    );

    expect(validate.jsonSchema(res.body, successSchema)).toBeTrue();
  });

  test('existing name', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(solicitations.existingName());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      `${solicitations.existingName().solicitation.name} já foi cadastrado`
    );

    expect(validate.jsonSchema(res.body, businessErrorSchema)).toBeTrue();
  });

  test('empty name', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(solicitations.emptyName());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo é obrigatório.');

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
        .post(`solicitations`)
        .set('Authorization', token)
        .send(solicitations.existingName());

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
        .post(`solicitations`)
        .set('Authorization', token)
        .send(solicitations.existingName());

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
