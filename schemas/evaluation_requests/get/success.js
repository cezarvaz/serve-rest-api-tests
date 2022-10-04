const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-list-evaluation-request',
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
            required: [
              'evaluator_name',
              'evaluator_email',
              'evaluated_name',
              'status',
              'created_at',
              'expired_at',
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
              },
              expired_at: {
                type: 'string',
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
        properties: {
          id: {
            type: 'integer',
          },
          type: {
            type: 'string',
          },
          attributes: {
            type: 'object',
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
      additionalProperties: false,
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
              type: 'integer',
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
