const emptyName = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'unsuccess-solicitation-post-empty-name',
  type: 'object',
  required: ['message', 'error'],
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default emptyName;
