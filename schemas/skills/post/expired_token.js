const errorTokenSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#invalid-token-post-skill',
  type: 'object',
  required: ['errors'],
  properties: {
    errors: {
      $id: '#/properties/errors',
      type: 'string',
    },
  },
  additionalProperties: false,
};
export default errorTokenSchema;
