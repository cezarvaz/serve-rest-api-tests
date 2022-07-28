const nonExistentIdSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#nonexistent-id-skill-groups',
  type: 'object',
  required: ['errors'],
  additionalProperties: false,
  properties: {
    errors: {
      type: 'object',
      required: ['status', 'message'],
      additionalProperties: false,
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

export default nonExistentIdSchema;
