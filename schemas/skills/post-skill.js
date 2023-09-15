const postSkillSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#post-skill',
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
          enum: ['skills'],
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
          additionalProperties: false,
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
        relationships: {
          type: 'object',
          required: ['skill_group', 'positions'],
          additionalProperties: false,
          properties: {
            skill_group: {
              type: 'object',
              required: ['links', 'data'],
              additionalProperties: false,
              properties: {
                links: {
                  type: 'object',
                  required: ['related'],
                  additionalProperties: false,
                  properties: {
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
                      enum: ['skill_groups', 'positions'],
                    },
                  },
                },
              },
            },
            positions: {
              type: 'object',
              required: ['data'],
              additionalProperties: false,
              properties: {
                data: {
                  type: 'array',
                  items: {},
                },
                links: {
                  type: 'object',
                  required: ['related'],
                  additionalProperties: false,
                  properties: {
                    related: {
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
            required: ['name'],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              external_id: {
                type: 'null',
              },
              archived: {
                type: 'boolean',
              },
              axis: {
                type: 'null',
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
  },
};

export default postSkillSchema;
