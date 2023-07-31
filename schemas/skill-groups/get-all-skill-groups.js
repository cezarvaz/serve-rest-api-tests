const sucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-all-skill-groups',
  type: 'object',
  required: ['data', 'included', 'meta'],
  additionalProperties: false,
  properties: {
    data: {
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
            required: [
              'name',
              'external_id',
              'archived',
              'axis',
              'created_at',
              'updated_at',
            ],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
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
    included: {
      type: 'array',
      items: {},
    },
    meta: {
      type: 'object',
      required: ['pagination', 'ninebox_turn_on'],
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
        ninebox_turn_on: {
          type: 'boolean',
        },
      },
    },
  },
};
export default sucessSchema;
