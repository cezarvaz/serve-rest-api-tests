const get_company_evaluations_stats = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-company-evaluations-stats',
  type: 'object',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['evaluations', 'evaluators'],
      additionalProperties: false,
      properties: {
        evaluations: {
          type: 'object',
          required: ['total', 'answered', 'pending'],
          additionalProperties: false,
          properties: {
            total: {
              type: 'integer',
            },
            answered: {
              type: 'integer',
            },
            pending: {
              type: 'integer',
            },
          },
        },
        evaluators: {
          type: 'object',
          required: ['total', 'pending'],
          additionalProperties: false,
          properties: {
            total: {
              type: 'integer',
            },
            pending: {
              type: 'integer',
            },
          },
        },
      },
    },
  },
};

export default get_company_evaluations_stats;
