const sucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-put-position-one-skill',
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
              },
              updated_at: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
export default sucessSchema;
