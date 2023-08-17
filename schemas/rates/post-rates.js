const post_rates = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-post-rates',
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
            type: 'number',
          },
          type: {
            type: 'string',
          },
          attributes: {
            type: 'object',
            required: [
              'company_id',
              'evaluation_id',
              'evaluator_id',
              'evaluated_id',
              'department_id',
              'position_id',
              'skill_id',
              'rate',
              'factor_at_moment',
              'skill_group_id',
            ],
            additionalProperties: false,
            properties: {
              company_id: {
                type: 'number',
              },
              evaluation_id: {
                type: 'number',
              },
              evaluator_id: {
                type: 'number',
              },
              evaluated_id: {
                type: 'number',
              },
              department_id: {
                type: 'number',
              },
              position_id: {
                type: 'number',
              },
              skill_id: {
                type: 'number',
              },
              rate: {
                type: 'number',
              },
              factor_at_moment: {
                type: 'number',
              },
              skill_group_id: {
                type: 'number',
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

export default post_rates;
