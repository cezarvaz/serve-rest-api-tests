const existingName = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'unsuccess-post-solicitations-existing-name',
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

export default existingName;
