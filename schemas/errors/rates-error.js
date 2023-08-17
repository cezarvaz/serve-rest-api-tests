export const rates_error_schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#ratesError',
  type: 'object',
  required: ['message', 'error'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: ['rate', 'skill_id'],
      additionalProperties: false,
      properties: {
        rate: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        skill_id: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default rates_error_schema;
