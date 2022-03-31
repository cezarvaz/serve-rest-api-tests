import request from "config/request.js";
import validate from "helper/validate.js";
import getEvalutaionCyclesSchema from "../../schemas/get-evaluation_cycles";
import errorSchema from "../../schemas/error";

const EXPIRED_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDMzMjgsImNvbXBhbnlfYWRtaW4iOnRydWUsInVzZXJfZW1haWwiOiJjb250YXRvQGNvbnRhYmlsaWRhZGUtYXV0ZW50aWNhLmNvbS5iciIsInVzZXJfbmFtZSI6IlRoaWFnbyBNb3JlaXJhIiwidXNlcl9jb21wYW55X25hbWUiOiJDb250YWJpbGlkYWRlIEF1dMOqbnRpY2EiLCJleHAiOjE2NDg3NjI1MzgsInVzZXJfY29tcGFueV9pZCI6NzQxMzksInRva2VuX3VzZSI6InJlZnJlc2giLCJpc3MiOiJHZXN0w6NvIFYxIiwiaWF0IjoxNjQ4NzI2NTM4fQ.GY-zA5kWUehzgjcqW-vbKAuE_FlMh1_mSNfk87xscQc";

describe.only("Get all the evaluation cycles", () => {
  it("successfully", async () => {
    const res = await request
      .get("evaluation_cycles")
      .set("Authorization", EXPIRED_TOKEN);

    // console.log(res.body);

    expect(res.headers).toHaveProperty(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data[0].id).toBeDefined();
    expect(res.body.data[0].type).toBe("evaluation_cycle");
    expect(res.body.data[0].attributes).toBeDefined();
    expect(res.body.meta.pagination.current).toBeDefined();
    expect(res.body.meta.pagination.previous).toBeDefined();
    expect(res.body.meta.pagination.next).toBeDefined();
    expect(res.body.meta.pagination.per_page).toBeDefined();
    expect(res.body.meta.pagination.pages).toBeDefined();
    expect(res.body.meta.pagination.total_count).toBeDefined();

    expect(validate.jsonSchema(res.body, getEvalutaionCyclesSchema)).toBe(true);
  });

  it("expired token", async () => {
    const res = await request
      .get("evaluation_cycles")
      .set("Authorization", EXPIRED_TOKEN);

    expect(res.headers).toHaveProperty(
      "content-type",
      "application/json; charset=utf-8"
    );
    expect(res.status).toBe(401);
    expect(res.body.errors).toBe("expired signature");

    expect(validate.jsonSchema(res.body, errorSchema)).toBe(true);
  });
});
