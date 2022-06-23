import request from "config/request";
import client from "helper/auth-client";
import EXPIRED_TOKEN from "utils/constants";
import validate from "helper/validate";
import fakerBr from "faker-br";
import successSchema from "schemas/group_criterias/put/success";
import expiredTokenSchema from "schemas/group_criterias/put/expired_token";
import invalidNameSchema from "schemas/group_criterias/put/invalid_name";

beforeAll(async () => {
  await client.auth();
});

let successfuly_id = 18;
let payload;
const number = fakerBr.random.number({ max: 5000 });

beforeEach(() => {
  payload = {
    group_criteria: {
      name: number + "_Teste_API",
      active: true,
    },
  };
});

describe("Update a Group Criteria", () => {
  test("successfully", async () => {
    const res = await request
      .put("group_criterias/" + successfuly_id)
      .set("Authorization", "Bearer " + client.accessToken)
      .send(payload);

    expect(res.status).toBe(202);
    expect(res.body.data.id).toBe(successfuly_id);
    expect(res.body.data.type).toBe("group_criterias");
    expect(res.body.data.attributes.name).toBe(payload.group_criteria.name);
    expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });

  test("expired token", async () => {
    const res = await request
      .put("group_criterias/" + successfuly_id)
      .set("Authorization", "Bearer " + EXPIRED_TOKEN)
      .send(payload);

    expect(res.status).toBe(401);
    expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
  });

  test("null name", async () => {
    payload.group_criteria.name = null
    const res = await request
      .put("group_criterias/" + successfuly_id)
      .set("Authorization", "Bearer " + client.accessToken)
      .send(payload);

    expect(res.status).toBe(422);
    expect(res.body.message).toBe("Não foi atualizado(a).")
    expect(res.body.error.name[0]).toBe("Este campo é obrigatório")
    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });

  test("empty name", async () => {
    payload.group_criteria.name = ""
    const res = await request
      .put("group_criterias/" + successfuly_id)
      .set("Authorization", "Bearer " + client.accessToken)
      .send(payload);

    expect(res.status).toBe(422);
    expect(res.body.message).toBe("Não foi atualizado(a).")
    expect(res.body.error.name[0]).toBe("Este campo é obrigatório")
    expect(validate.jsonSchema(res.body, invalidNameSchema)).toBe(true);
  });

  test("archiving group criteria", async () => {
    payload.group_criteria.active = false
    const res = await request
      .put("group_criterias/" + successfuly_id)
      .set("Authorization", "Bearer " + client.accessToken)
      .send(payload);

      expect(res.status).toBe(202);
      expect(res.body.data.id).toBe(successfuly_id);
      expect(res.body.data.type).toBe("group_criterias");
      expect(res.body.data.attributes.name).toBe(payload.group_criteria.name);
      expect(res.body.data.attributes.active).toBe(false)
      expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
  });
});
