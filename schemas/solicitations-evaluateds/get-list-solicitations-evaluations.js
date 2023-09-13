const get_list_solicitations_evaluateds = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-list-solicitations-evaluateds',
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
            required: ['evaluated_name'],
            additionalProperties: false,
            properties: {
              evaluated_name: {
                type: 'string',
              },
            },
          },
          relationships: {
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
            required: ['name', 'started_at', 'finished_at'],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              started_at: {
                type: 'string',
                format: 'date',
              },
              finished_at: {
                type: 'string',
                format: 'date',
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
              type: 'null',
            },
            next: {
              type: 'integer',
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

export default get_list_solicitations_evaluateds;
