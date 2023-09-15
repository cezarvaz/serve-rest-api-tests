import request from 'config/request';
import client from 'helpers/AuthClient';
import validate from 'helpers/Validate';
import postSkillSchema from 'schemas/skills/post-skill';
import skillGroups from 'factories/SkillGroups';
import positions from 'factories/Positions';
import fakerBr from 'faker-br';
import each from 'jest-each';
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from 'utils/constants';
import errorSchema from 'schemas/errors/error';
import simpleErrorSchema from 'schemas/errors/simple-error';
import businessErrorSchema from 'schemas/errors/business-error';

let payload;

describe('Create skill', () => {
  beforeAll(async () => {
    await client.auth();
    await positions.getPositionList();
    await skillGroups.getSkillGroup();
  });

  beforeEach(async () => {
    payload = {
      skill: {
        name: `${fakerBr.random.number({
          max: 999999999999,
        })}_criado pela automação de testes de API`,
        description: fakerBr.random.words(),
        factor: 77,
        archived: false,
        skill_group_id: skillGroups.groupId,
        position_ids: positions.positionIdList,
      },
    };
  });

  test('successfully with multiple positions', async () => {
    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data).toMatchObject({
      type: 'skills',
      attributes: {
        name: payload.skill.name,
        description: payload.skill.description,
        factor: payload.skill.factor,
        external_id: null,
        archived: false,
        created_at: body.data.attributes.updated_at,
      },
      relationships: {
        skill_group: {
          links: {
            related: `evaluation/api/skill_groups/${skillGroups.groupId}`,
          },
          data: {
            id: skillGroups.groupId,
            type: 'skill_groups',
          },
        },
      },
    });
    expect(body.data.relationships.positions.data).toIncludeAllPartialMembers(
      positions.positionIdList,
    );

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('successfully with one position', async () => {
    payload.skill.position_ids = [];
    payload.skill.position_ids.push(positions.positionIdList[0]);

    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data).toMatchObject({
      type: 'skills',
      attributes: {
        name: payload.skill.name,
        description: payload.skill.description,
        factor: payload.skill.factor,
        external_id: null,
        archived: false,
        created_at: body.data.attributes.updated_at,
      },
      relationships: {
        skill_group: {
          links: {
            related: `evaluation/api/skill_groups/${skillGroups.groupId}`,
          },
          data: {
            id: skillGroups.groupId,
            type: 'skill_groups',
          },
        },
        positions: {
          data: [
            {
              id: positions.positionIdList[0],
              type: 'positions',
            },
          ],
        },
      },
    });

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('successfully without any position', async () => {
    payload.skill.position_ids = [];

    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    expect(body.data).toMatchObject({
      type: 'skills',
      attributes: {
        name: payload.skill.name,
        description: payload.skill.description,
        factor: payload.skill.factor,
        external_id: null,
        archived: false,
        created_at: body.data.attributes.updated_at,
      },
      relationships: {
        skill_group: {
          links: {
            related: `evaluation/api/skill_groups/${skillGroups.groupId}`,
          },
          data: {
            id: skillGroups.groupId,
            type: 'skill_groups',
          },
        },
      },
    });
    expect(body.data.relationships.positions.data).toBeEmpty();

    expect(validate.jsonSchema(body, postSkillSchema)).toBeTrue();
  });

  test('should validate a skill with no name', async () => {
    delete payload.skill.name;

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe('Este campo é obrigatório.');

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  each`
  name      | scenario        | error
  ${'____'} | ${'an invalid'} | ${'O nome da competências deverá conter pelo menos uma letra do alfabeto.'}
  ${null}   | ${'a null'}     | ${'Este campo é obrigatório.'}
  ${''}     | ${'an empty'}   | ${'Este campo é obrigatório.'}
  `.test('should validate $scenario skill name', async ({ name, error }) => {
    payload.skill.name = name;

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.name[0]).toBe(error);

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  test('shlould validate a skill without skill group', async () => {
    delete payload.skill.skill_group_id;

    const { status, body, headers } = await request
      .post('skills')
      .set('Authorization', `Bearer ${client.accessToken}`)
      .send(payload);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    // expect(body.error.skill_group[0]).toBe('Este campo é obrigatório.'); //https://solides.atlassian.net/browse/TDEP-4049

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  each`
  skillGroup | scenario
  ${'____'}  | ${'an invalid'}
  ${null}    | ${'a null'}
  ${''}      | ${'an empty'}
  `.test('should validate $scenario skill group id', async ({ skillGroup }) => {
    payload.skill.skill_group_id = skillGroup;

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(422);
    expect(body.message).toBe('Não pode ser criado');
    expect(body.error.skill_group[0]).toBe(
      'translation missing: pt-BR.activerecord.errors.models.skill.attributes.skill_group.required',
    ); // https://solides.atlassian.net/browse/TDEP-4049

    if (skillGroup == '____') {
      expect(body.error.skill_group_id[0]).toBe('não é válido');
    }

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  each`
  position  | scenario
  ${'____'} | ${'an invalid'}
  ${null}   | ${'a null'}
  ${''}     | ${'an empty'}
  `.test.skip(
    'should validate $scenario skill group id',
    async ({ position }) => {
      // https://solides.atlassian.net/browse/TDEP-4300
      payload.skill.position_ids = position;

      const { status, body, headers } = await request
        .post('skills')
        .send(payload)
        .set('Authorization', `Bearer ${client.accessToken}`);

      expect(headers).toHaveProperty(
        'content-type',
        'application/json; charset=utf-8',
      );
      expect(status).toBe(422);
      expect(body.message).toBe('Não pode ser criado');
      expect(body.error.position[0]).toBe(
        'translation missing: pt-BR.activerecord.errors.models.skill.attributes.skill_group.required',
      ); // https://solides.atlassian.net/browse/TDEP-4049

      if (position == '____') {
        expect(body.error.position_id[0]).toBe('não é válido');
      }

      expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
    },
  );

  each`
  factor    | scenario
  ${'____'} | ${'an invalid'}
  ${null}   | ${'a null'}
  ${''}     | ${'an empty'}
  `.test.skip('should validate $scenario factor', async ({ factor }) => {
    // https://solides.atlassian.net/browse/TDEP-4286
    payload.skill.factor = factor;

    const { status, body, headers } = await request
      .post('skills')
      .send(payload)
      .set('Authorization', `Bearer ${client.accessToken}`);

    expect(headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(status).toBe(201);
    // expect(body.message).toBe('Não pode ser criado');
    // expect(body.error.skill_group[0]).toBe(
    //   'translation missing: pt-BR.activerecord.errors.models.skill.attributes.skill_group.required',
    // ); // https://solides.atlassian.net/browse/TDEP-4049

    expect(validate.jsonSchema(body, businessErrorSchema)).toBeTrue();
  });

  each`
  token                       | scenario               | statusCode | message
  ${'token'}                  | ${'an invalid'}        | ${403}     | ${'RESOURCE Forbidden'}
  ${null}                     | ${'a null'}            | ${403}     | ${'RESOURCE Forbidden'}
  ${''}                       | ${'an empty'}          | ${401}     | ${'Unauthorized'}
  ${EXPIRED_TOKEN}            | ${'an expired'}        | ${401}     | ${'decoding error'}
  ${UNAUTHORIZED_TOKEN}       | ${'an unauthorized'}   | ${401}     | ${'decoding error'}
  `.test(
    'should validate $scenario authentication token',
    async ({ token, statusCode, message }) => {
      const { status, body, headers } = await request
        .post(`skills`)
        .send(payload)
        .set('Authorization', token);
      if (token === EXPIRED_TOKEN || token === UNAUTHORIZED_TOKEN) {
        expect(headers).toHaveProperty(
          'content-type',
          'application/json; charset=utf-8',
        );
        expect(body.errors).toBe(message);
        expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
      } else {
        expect(headers).toHaveProperty('content-type', 'application/json');
        expect(body.error.message).toBe(message);
        expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
      }
      expect(status).toBe(statusCode);
    },
  );
});
