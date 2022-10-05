const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#succes-put-evaluation-requests',
  type: 'object',
  required: ['data', 'included'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['id', 'type', 'attributes', 'relationships'],
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
            'expired_at',
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
  },
};

export default successSchema;
