export const solicitations_evaluations_error = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#solicitations-evaluations-error',
  type: 'object',
  required: ['message', 'error'],
  additionalProperties: false,
  properties: {
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      additionalProperties: false,
      properties: {
        evaluator_id: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
        evaluated_id: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
        evaluated_name: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
        evaluator_name: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
        position_id: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
        evaluator_email: {
          type: 'array',
          items: {
            type: ['string', 'null'],
          },
        },
      },
    },
  },
};

export default solicitations_evaluations_error;
