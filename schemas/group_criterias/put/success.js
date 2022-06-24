const sucessSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "#success-put-group-criterias",
  title: "Root",
  type: "object",
  required: ["data"],
  properties: {
    data: {
      $id: "#root/data",
      title: "Data",
      type: "object",
      required: ["id", "type", "attributes"],
      properties: {
        id: {
          $id: "#root/data/id",
          title: "Id",
          type: "integer",
          examples: [20],
          default: 0,
        },
        type: {
          $id: "#root/data/type",
          title: "Type",
          type: "string",
          default: "",
          examples: ["group_criterias"],
          pattern: "^.*$",
        },
        attributes: {
          $id: "#root/data/attributes",
          title: "Attributes",
          type: "object",
          required: [
            "name",
            "external_id",
            "active",
            "created_at",
            "updated_at",
          ],
          properties: {
            name: {
              $id: "#root/data/attributes/name",
              title: "Name",
              type: "string",
              default: "",
              examples: ["pastel"],
              pattern: "^.*$",
            },
            external_id: {
              $id: "#root/data/attributes/external_id",
              title: "External_id",
              type: "null",
              default: null,
            },
            active: {
              $id: "#root/data/attributes/active",
              title: "Active",
              type: "boolean",
              examples: [true],
              default: true,
            },
            created_at: {
              $id: "#root/data/attributes/created_at",
              title: "Created_at",
              type: "string",
              default: "",
              examples: ["2022-05-12T12:35:02.373-03:00"],
              pattern: "^.*$",
            },
            updated_at: {
              $id: "#root/data/attributes/updated_at",
              title: "Updated_at",
              type: "string",
              default: "",
              examples: ["2022-06-23T17:01:57.056-03:00"],
              pattern: "^.*$",
            },
          },
        },
      },
    },
  },
};
export default sucessSchema;
