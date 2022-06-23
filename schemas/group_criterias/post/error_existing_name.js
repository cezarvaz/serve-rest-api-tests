const errorExistingNameSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://example.com/object1655823449.json",
  title: "Root",
  type: "object",
  properties: {
    message: {
      $id: "#root/message",
      title: "Message",
      type: "string",
      default: "",
      pattern: "^.*$",
    },
    error: {
      $id: "#root/error",
      title: "Error",
      type: "object",
      properties: {
        name: {
          $id: "#root/error/name",
          title: "Name",
          type: "array",
          default: [],
          items: {
            $id: "#root/error/name/items",
            title: "Items",
            type: "string",
            default: "",
            pattern: "^.*$",
          },
        },
      },
    },
  },
};
export default errorExistingNameSchema;
