const get_collaborators = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-collaborators',
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
              'position_id',
              'department_id',
              'unit_id',
            ],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              position_id: {
                type: ['integer', 'null'],
              },
              department_id: {
                type: ['integer', 'null'],
              },
              unit_id: {
                type: ['integer', 'null'],
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

export default get_collaborators;
