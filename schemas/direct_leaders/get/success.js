const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-direct-leaders',
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
          },
          attributes: {
            type: 'object',
            required: ['name', 'image'],
            properties: {
              name: {
                type: 'string',
              },
              image: {
                type: 'object',
                required: ['url', 'thumb', 'avatar'],
                properties: {
                  url: {
                    type: 'null',
                  },
                  thumb: {
                    type: 'object',
                    required: ['url'],
                    properties: {
                      url: {
                        type: 'null',
                      },
                    },
                  },
                  avatar: {
                    type: 'object',
                    required: ['url'],
                    properties: {
                      url: {
                        type: 'null',
                      },
                    },
                  },
                },
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
              type: 'null',
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

export default successSchema;
