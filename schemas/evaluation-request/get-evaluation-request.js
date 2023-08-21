const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-evaluation-request',
  type: 'object',
  required: ['data', 'included', 'meta'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes', 'relationships'],
        additionalProperties: false,
        properties: {
          id: {
            type: 'number',
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
              'answered_at',
              'evaluator_position',
            ],
            additionalProperties: false,
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
              answered_at: {
                type: ['null', 'string'],
              },
              evaluator_position: {
                type: 'string',
              },
            },
          },
          relationships: {
            type: 'object',
            required: ['position'],
            additionalProperties: false,
            properties: {
              position: {
                type: 'object',
                required: ['links', 'data'],
                additionalProperties: false,
                properties: {
                  links: {
                    type: 'object',
                    required: ['self', 'related'],
                    additionalProperties: false,
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
                    additionalProperties: false,
                    properties: {
                      id: {
                        type: 'number',
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
        additionalProperties: false,
        properties: {
          id: {
            type: 'number',
          },
          type: {
            type: 'string',
          },
          attributes: {
            type: 'object',
            required: ['name', 'description'],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              description: {
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
          additionalProperties: false,
          properties: {
            current: {
              type: 'number',
            },
            previous: {
              type: 'null',
            },
            next: {
              type: 'null',
            },
            per_page: {
              type: 'number',
            },
            pages: {
              type: 'number',
            },
            total_count: {
              type: 'number',
            },
          },
        },
      },
    },
  },
};

export default successSchema;
