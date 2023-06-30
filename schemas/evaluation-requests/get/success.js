const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-evaluation-requests',
  type: 'object',
  required: ['data', 'included', 'meta'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes'],
        additionalProperties: false,
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
              'evaluator_name',
              'evaluator_email',
              'evaluated_name',
              'status',
              'created_at',
            ],
            properties: {
              evaluator_name: {
                type: 'string',
              },
              evaluator_email: {
                type: 'string',
              },
              evaluated_name: {
                type: 'string',
              },
              status: {
                type: 'string',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
          relationships: {
            type: 'object',
            required: ['position'],
            properties: {
              position: {
                type: 'object',
                required: ['links', 'data'],
                properties: {
                  links: {
                    type: 'object',
                    required: ['self', 'related'],
                    properties: {
                      self: {
                        type: 'string',
                      },
                      related: {
                        type: 'string',
                      },
                    },
                  },
                  data: {
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
            required: ['name'],
            properties: {
              name: {
                type: 'string',
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

export default successSchema;
