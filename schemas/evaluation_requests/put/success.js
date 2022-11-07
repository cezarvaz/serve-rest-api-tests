const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-put-evaluation-requests',
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
            'evaluator_email',
            'evaluated_name',
            'status',
            'created_at',
            'expired_at',
            'answered_at',
            'evaluator_position',
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
            answered_at: {
              type: 'null',
            },
            evaluator_position: {
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
  },
};

export default successSchema;
