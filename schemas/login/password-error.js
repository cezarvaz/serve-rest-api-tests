const passwordErrorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#password-error',
  type: 'object',
  required: ['password'],
  additionalProperties: false,
  properties: {
    password: {
      type: 'string',
    },
  },
};

export default passwordErrorSchema;
