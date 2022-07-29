const empty_name = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'empty-name-post-skill',
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

export default empty_name;
