const get_averages_solicitations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-get-averages-solicitations',
  type: 'object',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['average'],
      additionalProperties: false,
      properties: {
        average: {
          type: 'number',
        },
      },
    },
  },
};
export default get_averages_solicitations;
