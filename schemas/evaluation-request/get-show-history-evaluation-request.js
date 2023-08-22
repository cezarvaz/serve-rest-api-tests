const get_show_history_evaluation_request = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-show-history-evaluation-request',
  type: 'object',
  required: ['data', 'included'],
  additionalProperties: false,
  properties: {
    data: {
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
          required: ['show_history'],
          additionalProperties: false,
          properties: {
            show_history: {
              type: 'boolean',
            },
          },
        },
      },
    },
    included: {
      type: 'array',
      items: {},
    },
  },
};

export default get_show_history_evaluation_request;
