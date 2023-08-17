const get_solicitations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#succes-solicitations-list',
  type: 'object',
  required: ['data', 'included', 'meta'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'attributes', 'links'],
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
                type: ['string', 'null'],
              },
              step: {
                type: 'number',
              },
              started_at: {
                type: 'string',
                format: 'date',
              },
              actions: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              finished_at: {
                type: 'string',
                format: 'date',
              },
              status: {
                type: 'string',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
              },
              scale: {
                type: ['string', 'null'],
              },
              pattern: {
                type: ['string', 'null'],
              },
              self_evaluation_considerated: {
                type: 'boolean',
              },
              scale_number: {
                type: 'number',
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
    included: {
      type: 'array',
      items: {},
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
              type: ['integer', 'null'],
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

export default get_solicitations;
