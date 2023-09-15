const get_evaluation_average_positions = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-evaluation-average-positions',
  type: 'object',
  required: ['data', 'included', 'meta'],
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes', 'links'],
        properties: {
          id: {
            type: 'integer',
          },
          type: {
            type: 'string',
            enum: ['positions'],
          },
          attributes: {
            type: 'object',
            required: ['name', 'average'],
            properties: {
              name: {
                type: 'string',
              },
              average: {
                type: ['number', 'null'],
              },
            },
          },
          links: {
            type: 'object',
            required: ['self'],
            properties: {
              self: {
                type: 'string',
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
          type: 'object',
          required: [
            'current',
            'previous',
            'next',
            'per_page',
            'pages',
            'total_count',
          ],
          properties: {
            current: {
              type: 'integer',
            },
            previous: {
              type: 'null',
            },
            next: {
              type: ['integer', 'null'],
            },
            per_page: {
              type: 'integer',
            },
            pages: {
              type: 'integer',
            },
            total_count: {
              type: 'integer',
            },
          },
        },
      },
    },
  },
};

export default get_evaluation_average_positions;
