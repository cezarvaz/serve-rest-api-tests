const invalidNameSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#invalid-name-put-skill-groups',
  type: 'object',
  required: ['message', 'error'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: ['name'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};
export default invalidNameSchema;
