const post_collaborators = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#post-collaborators',
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
            enum: ['collaborators'],
          },
          attributes: {
            type: 'object',
            required: [
              'name',
              'email',
              'department_id',
              'unit_id',
              'position_id',
            ],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              department_id: {
                type: 'integer',
              },
              unit_id: {
                type: 'integer',
              },
              position_id: {
                type: 'integer',
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

export default post_collaborators;
