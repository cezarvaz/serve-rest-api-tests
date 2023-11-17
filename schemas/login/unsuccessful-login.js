const unsuccessfulLoginSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#unsuccessful-login',
  type: 'object',
  required: ['message'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
  },
};

export default unsuccessfulLoginSchema;
