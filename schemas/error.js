const errorSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "#error",
  type: "object",
  required: ["errors"],
  properties: {
    errors: {
      $id: "#/properties/errors",
      type: "string",
    },
  },
  additionalProperties: false,
};
export default errorSchema;
