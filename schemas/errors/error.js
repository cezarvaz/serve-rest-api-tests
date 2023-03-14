export const errorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#error',
  type: 'object',
  required: ['error'],
  additionalProperties: false,
  properties: {
    error: {
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

export default errorSchema;
