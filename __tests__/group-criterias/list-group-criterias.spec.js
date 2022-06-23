import request from "config/request";
import client from "helper/auth-client";
import EXPIRED_TOKEN from "utils/constants";
import validate from "helper/validate";
import successSchema from "schemas/group_criterias/list/success"
import expiredTokenSchema from "schemas/group_criterias/list/expired_token"

beforeAll(async () => {
  await client.auth();
});

describe("List Group Criterias", () => {
    
    test("successfully", async () => {
        const res = await request
          .get("group_criterias")
          .set("Authorization", "Bearer " + client.accessToken);
  
        expect(res.status).toBe(200);
        expect(validate.jsonSchema(res.body, successSchema)).toBe(true);
      });

      test("expired token", async () => {
        const res = await request
          .get("group_criterias")
          .set("Authorization", "Bearer " + EXPIRED_TOKEN);
  
        expect(res.status).toBe(401);
        expect(validate.jsonSchema(res.body, expiredTokenSchema)).toBe(true);
      });
});
