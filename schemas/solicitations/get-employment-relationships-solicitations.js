const get_employment_relationships_solicitations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-get-employment-relationships-solicitations',
  type: 'object',
  required: ['data'],
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
            type: 'number',
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
            },
          },
        },
      },
    },
  },
};
export default get_employment_relationships_solicitations;
