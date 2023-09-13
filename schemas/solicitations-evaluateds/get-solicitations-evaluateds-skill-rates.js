const get_solicitations_evaluateds_skill_rates = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-solicitations-evaluateds-skill-rates',
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
          },
          attributes: {
            type: 'object',
            required: ['skill_group', 'skill_group_average', 'skills'],
            additionalProperties: false,
            properties: {
              skill_group: {
                type: 'string',
              },
              skill_group_average: {
                type: 'number',
              },
              skills: {
                type: 'array',
                items: {
                  type: 'object',
                  required: [
                    'skill_id',
                    'skill_name',
                    'evaluated_average',
                    'position_average',
                    'rates',
                  ],
                  additionalProperties: false,
                  properties: {
                    skill_id: {
                      type: 'integer',
                    },
                    skill_name: {
                      type: 'string',
                    },
                    evaluated_average: {
                      type: 'integer',
                    },
                    position_average: {
                      type: 'integer',
                    },
                    rates: {
                      type: 'array',
                      items: {
                        type: 'object',
                        required: [
                          'id',
                          'evaluator_id',
                          'evaluator',
                          'rate',
                          'moderated',
                        ],
                        additionalProperties: false,
                        properties: {
                          id: {
                            type: 'integer',
                          },
                          evaluator_id: {
                            type: 'integer',
                          },
                          evaluator: {
                            type: 'string',
                          },
                          rate: {
                            type: 'integer',
                          },
                          moderated: {
                            type: 'boolean',
                          },
                        },
                      },
                    },
                  },
                },
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
export default get_solicitations_evaluateds_skill_rates;
