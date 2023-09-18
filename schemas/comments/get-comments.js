const get_comments = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-comments',
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
            enum: ['comments'],
          },
          attributes: {
            type: 'object',
            required: [
              'evaluator_id',
              'evaluator_name',
              'text',
              'moderated',
              'created_at',
            ],
            additionalProperties: false,
            properties: {
              evaluator_id: {
                type: 'integer',
              },
              evaluator_name: {
                type: 'string',
              },
              text: {
                type: 'string',
              },
              moderated: {
                type: 'boolean',
              },
              created_at: {
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
              type: 'null',
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

export default get_comments;
