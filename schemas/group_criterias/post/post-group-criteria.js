const postGroupCriteriaSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "#success-post-group-criteria",
  type: "object",
  required: ["data"],
  additionalProperties: false,
  properties: {
    data: {
      type: "object",
      required: ["id", "type", "attributes"],
      additionalProperties: false,
      properties: {
        id: {
          type: "integer",
        },
        type: {
          type: "string",
        },
        attributes: {
          type: "object",
          required: [
            "name",
            "external_id",
            "active",
            "created_at",
            "updated_at",
          ],
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
            },
            external_id: {
              type: "null",
            },
            active: {
              type: "boolean",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },
};

export default postGroupCriteriaSchema;
