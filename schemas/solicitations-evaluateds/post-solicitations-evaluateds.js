const post_solicitations_evaluateds = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#post-solicitations-evaluateds',
  type: 'object',
  required: ['message', 'status'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
};

export default post_solicitations_evaluateds;
