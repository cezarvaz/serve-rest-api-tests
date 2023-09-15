const get_rates_avarege = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-rates-avarege',
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
          enum: ['rates_averages'],
        },
        attributes: {
          type: 'object',
          required: ['position_average', 'evaluated_average'],
          additionalProperties: false,
          properties: {
            position_average: {
              type: 'number',
            },
            evaluated_average: {
              type: 'number',
            },
          },
        },
        relationships: {
          type: 'object',
          required: ['solicitation'],
          additionalProperties: false,
          properties: {
            solicitation: {
              type: 'object',
              required: ['data'],
              additionalProperties: false,
              properties: {
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
        required: ['id', 'type', 'attributes', 'links'],
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
              'step',
              'started_at',
              'actions',
              'finished_at',
              'status',
              'created_at',
              'updated_at',
              'scale',
              'pattern',
              'self_evaluation_considerated',
              'scale_number',
              'self_evaluation_included',
              'hired_before',
              'mandatory_comment',
              'employment_relationships',
            ],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              step: {
                type: 'integer',
              },
              started_at: {
                type: 'string',
              },
              actions: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              finished_at: {
                type: 'string',
              },
              status: {
                type: 'string',
              },
              created_at: {
                type: 'string',
              },
              updated_at: {
                type: 'string',
              },
              scale: {
                type: 'null',
              },
              pattern: {
                type: 'null',
              },
              self_evaluation_considerated: {
                type: 'boolean',
              },
              scale_number: {
                type: 'integer',
              },
              self_evaluation_included: {
                type: 'boolean',
              },
              hired_before: {
                type: 'null',
              },
              mandatory_comment: {
                type: 'boolean',
              },
              employment_relationships: {
                type: 'null',
              },
            },
          },
          links: {
            type: 'array',
            items: {
              type: 'object',
              required: ['href', 'rel', 'type'],
              additionalProperties: false,
              properties: {
                href: {
                  type: 'string',
                },
                rel: {
                  type: 'string',
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
};
export default get_rates_avarege;
