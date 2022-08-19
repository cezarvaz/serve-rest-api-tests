const successSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-get-evaluation-stats',
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['evaluations', 'evaluators'],
      properties: {
        evaluations: {
          type: 'object',
          required: ['total', 'answered', 'pending'],
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

export default successSchema;
