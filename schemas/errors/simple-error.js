const simpleErrorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#simple-error',
  type: 'object',
  required: ['errors'],
  additionalProperties: false,
  properties: {
    errors: {
      type: 'string',
    },
  },
};

export default simpleErrorSchema;
