const invalidIdSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#invalid-id-get-skill-groups',
  type: 'object',
  required: ['errors'],
  properties: {
    errors: {
      type: 'object',
      required: ['status', 'message'],
      properties: {
        status: {
          type: 'integer',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};

export default invalidIdSchema;
