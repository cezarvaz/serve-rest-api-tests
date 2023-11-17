const successfulLoginSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#successful-login',
  type: 'object',
  required: ['message', 'authorization'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },
};

export default successfulLoginSchema;
