import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import solicitations from '../../factories/Solicitations';
import successSchema from 'schemas/solicitations/post/success';
import EXPIRED_TOKEN from 'utils/constants';
import expiredTokenSchema from 'schemas/departments/get/expired-token';
import existingName from 'schemas/solicitations/post/existing-name';
import emptyName from 'schemas/solicitations/post/empty-name';

describe('Create a solicitation', () => {
  beforeAll(async () => {
    await client.auth();
  });

  test('successfully', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(solicitations.postPayload());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(201);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
    expect(res.body.data.type).toBe('solicitations');
    expect(res.body.data.attributes.name).toBe(
      solicitations.postPayload().solicitation.name
    );
  });

  test('existing name', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(solicitations.existingName());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(validate.jsonSchema(res.body, existingName)).toBe(true);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe(
      `${solicitations.existingName().solicitation.name} já foi cadastrado`
    );
  });

  test('empty name', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', 'Bearer ' + client.accessToken)
      .send(solicitations.emptyName());
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(422);
    expect(validate.jsonSchema(res.body, emptyName)).toBe(true);
    expect(res.body.message).toBe('Não pode ser criado');
    expect(res.body.error.name[0]).toBe('Este campo é obrigatório.');
  });

  test('expired token', async () => {
    const res = await request
      .post(`solicitations`)
      .set('Authorization', 'Bearer ' + EXPIRED_TOKEN)
      .send(solicitations.postPayload());

    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8'
    );
    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });
});
