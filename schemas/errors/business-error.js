const businessErrorSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#business-error',
  type: 'object',
  required: ['message', 'error'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      required: [],
      additionalProperties: false,
      properties: {
        factor: {
          type: 'array',
        },
        name: {
          type: 'array',
        },
        skill_group: {
          type: 'array',
        },
        skill_group_id: {
          type: 'array',
        },
        started_at: {
          type: 'array',
        },
        finished_at: {
          type: 'array',
        },
      },
    },
  },
};

export default businessErrorSchema;
