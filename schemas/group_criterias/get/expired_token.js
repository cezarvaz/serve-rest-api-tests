const expiredTokenSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "#expired-token-get-group-criteria",
  title: "Root",
  type: "object",
  required: ["errors"],
  properties: {
    errors: {
      $id: "#root/errors",
      title: "Errors",
      type: "string",
      default: "",
      examples: ["expired signature"],
      pattern: "^.*$",
    },
  },
};
export default expiredTokenSchema;
