const sucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-list-skill-groups',
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
              'created_at',
              'updated_at',
            ],
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
export default sucessSchema;
