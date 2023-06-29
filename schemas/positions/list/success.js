const sucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-list-positions',
  type: 'object',
  required: ['data', 'included', 'meta'],
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes', 'relationships'],
        properties: {
          id: {
            type: 'integer',
          },
          type: {
            type: 'string',
          },
          attributes: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: ['string', 'null'],
              },
            },
          },
          relationships: {
            type: 'object',
            required: ['skills'],
            properties: {
              skills: {
                type: 'object',
                required: ['links', 'data'],
                properties: {
                  links: {
                    type: 'object',
                    required: ['related'],
                    properties: {
                      related: {
                        type: 'string',
                      },
                    },
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['id', 'type'],
                      properties: {
                        id: {
                          type: 'integer',
                        },
                        type: {
                          type: 'string',
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
    },
    included: {
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
            required: [
              'name',
              'description',
              'factor',
              'external_id',
              'archived',
              'created_at',
              'updated_at',
            ],
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              factor: {
                type: 'integer',
              },
              external_id: {
                type: 'null',
              },
              archived: {
                type: 'boolean',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
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
export default sucessSchema;
