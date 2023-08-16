const get_ninebox_results_solicitations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-get-ninebox-results-solicitations',
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
          required: ['quadrants'],
          additionalProperties: false,
          properties: {
            quadrants: {
              type: 'object',
              required: [
                'insufficient',
                'work_values',
                'develop_behavior',
                'check_status',
                'develop_technique',
                'improve_behavior_and_technique',
                'improve_behavior',
                'improve_technique',
                'emphasis',
              ],
              additionalProperties: false,
              properties: {
                insufficient: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                work_values: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                develop_behavior: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                check_status: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                develop_technique: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                improve_behavior_and_technique: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                improve_behavior: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                improve_technique: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
                    },
                  },
                },
                emphasis: {
                  type: 'object',
                  required: ['collaborators', 'total'],
                  additionalProperties: false,
                  properties: {
                    collaborators: {
                      type: 'array',
                      items: {},
                    },
                    total: {
                      type: 'number',
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
  },
};

export default get_ninebox_results_solicitations;
