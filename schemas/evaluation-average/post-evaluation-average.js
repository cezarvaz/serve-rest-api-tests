const post_evaluation_avarage = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#post-evaluation-avarage',
  type: 'object',
  required: ['message'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
  },
};

export default post_evaluation_avarage;
