const emailErrorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#email-error',
  type: 'object',
  required: ['email'],
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
    },
  },
};

export default emailErrorSchema;
