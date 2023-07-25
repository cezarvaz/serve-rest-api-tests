const getSkillsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '#success-list-skill-groups',
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
                type: ['integer', 'null'],
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
                required: ['data'],
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
                type: ['string', 'null'],
              },
              external_id: {
                type: ['integer', 'null'],
              },
              archived: {
                type: 'boolean',
              },
              axis: {
                type: ['string', 'null'],
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
              type: 'integer',
            },
            previous: {
              type: ['integer', 'null'],
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

export default getSkillsSchema;
