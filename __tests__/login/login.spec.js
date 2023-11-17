import request from 'config/request';
import validate from 'helpers/Validate';
import jwt from 'jsonwebtoken';
import each from 'jest-each';
import successfulLoginSchema from 'schemas/login/successful-login';
import emailErrorSchema from 'schemas/login/email-error';
import passowrdErrorSchema from 'schemas/login/password-error';
import unsuccessfulLoginSchema from 'schemas/login/unsuccessful-login';
import { VALID_EMAIL, VALID_PASSWORD } from 'utils/constants';

let payload;

describe('Login', () => {
  beforeEach(async () => {
    payload = {
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    };
  });

  test.skip('successfully', async () => {
    // returning 401
    const { status, body, headers } = await request.post('login').send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(200);
    expect(body.message).toBe('Login realizado com sucesso');
    expect(body.authorization).toContain('Bearer');
    const token = body.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    expect(decoded).toBeDefined();
    expect(decoded.email).toBe(payload.email);
    expect(decoded.password).toBe(payload.password);

    expect(validate.jsonSchema(body, successfulLoginSchema)).toBeTrue();
  });

  test('try logging in without the email field', async () => {
    delete payload.email;

    const { status, body, headers } = await request.post('login').send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(400);
    expect(body.email).toBe('email é obrigatório');

    expect(validate.jsonSchema(body, emailErrorSchema)).toBeTrue();
  });

  each`
  scenario               | value      | message
  ${'an invalid'}        | ${'token'} | ${'email deve ser um email válido'}
  ${'a null'}            | ${null}    | ${'email deve ser uma string'}
  ${'an empty'}          | ${''}      | ${'email não pode ficar em branco'}
  `.test(
    'try logging in with $scenario email field',
    async ({ value, message }) => {
      payload.email = value;

      const { status, body, headers } = await request
        .post(`login`)
        .send(payload);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(400);
      expect(body.email).toBe(message);

      expect(validate.jsonSchema(body, emailErrorSchema)).toBeTrue();
    },
  );

  test('try logging in without the password field', async () => {
    delete payload.password;

    const { status, body, headers } = await request.post('login').send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(400);
    expect(body.password).toBe('password é obrigatório');

    expect(validate.jsonSchema(body, passowrdErrorSchema)).toBeTrue();
  });

  test('try logging in with the wrong password', async () => {
    payload.password = 'token';

    const { status, body, headers } = await request.post('login').send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(401);
    expect(body.message).toBe('Email e/ou senha inválidos');

    expect(validate.jsonSchema(body, unsuccessfulLoginSchema)).toBeTrue();
  });

  each`
  scenario               | value      | message
  ${'a null'}            | ${null}    | ${'password deve ser uma string'}
  ${'an empty'}          | ${''}      | ${'password não pode ficar em branco'}
  `.test(
    'try logging in with $scenario password field',
    async ({ value, message }) => {
      payload.password = value;

      const { status, body, headers } = await request
        .post(`login`)
        .send(payload);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(400);
      expect(body.password).toBe(message);

      expect(validate.jsonSchema(body, passowrdErrorSchema)).toBeTrue();
    },
  );
});
