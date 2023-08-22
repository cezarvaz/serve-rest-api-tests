export const evaluation_request_error_schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#evaluationRequestError',
  type: 'object',
  required: ['message', 'error'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: ['expired_at'],
      additionalProperties: false,
      properties: {
        expired_at: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default evaluation_request_error_schema;
