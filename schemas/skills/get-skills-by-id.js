const getSkillsByIdSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-skill-by-id',
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
            'name',
            'description',
            'factor',
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
                    },
                  },
                },
              },
            },
            positions: {
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
                  type: 'array',
                  items: {
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
              description: {
                type: ['string', 'null'],
              },
            },
          },
        },
      },
    },
  },
};

export default getSkillsByIdSchema;
