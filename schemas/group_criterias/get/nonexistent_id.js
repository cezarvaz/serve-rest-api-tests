const nonExistentIdSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://example.com/object1656007958.json",
  title: "Root",
  type: "object",
  required: ["errors"],
  properties: {
    errors: {
      $id: "#root/errors",
      title: "Errors",
      type: "object",
      required: ["status", "message"],
      properties: {
        status: {
          $id: "#root/errors/status",
          title: "Status",
          type: "integer",
          examples: [404],
          default: 0,
        },
        message: {
          $id: "#root/errors/message",
          title: "Message",
          type: "string",
          default: "",
          examples: [
            "Não encontrado(a), pois possui erros. Preencha novamente.",
          ],
          pattern: "^.*$",
        },
      },
    },
  },
};
export default nonExistentIdSchema;
