const get_hierarchy = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-hierarchy',
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'link'],
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'object',
            required: ['pt-BR', 'en'],
            properties: {
              'pt-BR': {
                type: 'string',
              },
              en: {
                type: 'string',
              },
            },
          },
          link: {
            type: ['null', 'string'],
          },
        },
      },
    },
  },
};

export default get_hierarchy;
