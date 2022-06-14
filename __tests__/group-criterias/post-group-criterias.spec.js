import request from "config/request";
import client from "helper/auth-client";
import EXPIRED_TOKEN from "utils/constants";
import validate from "helper/validate";
import postGroupCriteriaSchema from "schemas/post-group-criteria";
import errorSchema from "schemas/error";
import fakerBr from "faker-br";

beforeAll(async () => {
  await client.auth();
});

let payload, postedGroupCriteria;

const number = fakerBr.random.number({ max: 5000 });

beforeEach(() => {
  payload = {
    group_criteria: {
      name: number + "_Teste_API",
    },
  };
});

describe("Create group criteria", () => {
  test("successfully", async () => {
    postedGroupCriteria = payload.group_criteria.name;

    const res = await request
      .post("group_criterias")
      .send(payload)
      .set("Authorization", "Bearer " + client.accessToken);

    expect(res.headers).toHaveProperty(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.type).toBe("group_criterias");
    expect(res.body.data.attributes.name).toBe(postedGroupCriteria);
    expect(res.body.data.attributes.external_id).toBe(null);
    expect(res.body.data.attributes.active).toBe(true);
    expect(res.body.data.attributes.created_at).toBeDefined();
    expect(res.body.data.attributes.updated_at).toBeDefined();

    expect(validate.jsonSchema(res.body, postGroupCriteriaSchema)).toBe(true);
  });

  test("unsuccefully due to the same name as before", async () => {
    payload.group_criteria.name = postedGroupCriteria;

    const res = await request
      .post("group_criterias")
      .send(payload)
      .set("Authorization", "Bearer " + client.accessToken);

    console.log(res.body);

    expect(res.headers).toHaveProperty(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(res.status).toBe(422);
    expect(res.body.message).toBe(
      "Não foi criado(a), pois possui erros. Preencha novamente."
    );
    expect(res.body.error.name[0]).toBe(
      "Já existe um grupo de competências com este nome."
    );

    expect(validate.jsonSchema(res.body, errorSchema)).toBe(true);
  });

  test("expired token", async () => {
    const res = await request
      .post("group_criterias")
      .send(payload)
      .set("Authorization", "Bearer " + EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(res.status).toBe(401);
    expect(res.body.errors).toBe("decoding error");

    expect(validate.jsonSchema(res.body, errorSchema)).toBe(true);
  });
});
