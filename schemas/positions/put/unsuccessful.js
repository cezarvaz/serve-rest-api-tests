const unsucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#unsuccess-put-position-empty-list',
  type: 'object',
  required: ['message', 'error'],
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: ['skill_ids'],
      properties: {
        skill_ids: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};
export default unsucessSchema;
