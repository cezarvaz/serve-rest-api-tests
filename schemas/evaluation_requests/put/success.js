const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#succes-put-evaluation-requests',
  type: 'object',
  required: ['data', 'included'],
  properties: {
    data: {
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
            'evaluator_position',
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
            evaluator_position: {
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
            answered_at: {
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
                  required: ['related', 'self'],
                  properties: {
                    related: {
                      type: 'string',
                    },
                    self: {
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
            required: ['name', 'description'],
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
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
  },
};

export default successSchema;
