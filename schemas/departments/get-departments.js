const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-departments',
  type: 'object',
  required: ['data', 'included', 'meta'],
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes'],
        properties: {
          id: {
            type: 'integer',
          },
          type: {
            type: 'string',
            enum: ['departments'],
          },
          attributes: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: ['null', 'string'],
              },
            },
          },
        },
      },
    },
    included: {
      type: 'array',
      items: {},
    },
    meta: {
      type: 'object',
      required: ['pagination'],
      properties: {
        pagination: {
          type: 'null',
        },
      },
    },
  },
};

export default successSchema;
