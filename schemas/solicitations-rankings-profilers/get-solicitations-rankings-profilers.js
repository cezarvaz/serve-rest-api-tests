const get_solicitations_rankings_profilers = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-solicitations-rankings-profilers',
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
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['ranking_profilers'],
          },
          attributes: {
            type: 'object',
            required: ['name', 'average', 'total'],
            additionalProperties: false,
            properties: {
              name: {
                type: 'string',
              },
              average: {
                type: 'integer',
              },
              total: {
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
          type: 'null',
        },
      },
    },
  },
};

export default get_solicitations_rankings_profilers;
