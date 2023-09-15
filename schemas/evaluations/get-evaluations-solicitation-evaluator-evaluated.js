const get_evaluations_solicitation_evaluator_evaluated = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-get-evaluations-solicitation-evaluator-evaluated',
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
          type: 'integer',
        },
        type: {
          type: 'string',
        },
        attributes: {
          type: 'object',
          required: [
            'solicitation_id',
            'evaluator_id',
            'evaluated_id',
            'status',
            'expired_at',
            'expired',
            'evaluator_name',
            'created_at',
          ],
          additionalProperties: false,
          properties: {
            solicitation_id: {
              type: 'integer',
            },
            evaluator_id: {
              type: 'integer',
            },
            evaluated_id: {
              type: 'integer',
            },
            status: {
              type: 'string',
            },
            expired_at: {
              type: 'string',
            },
            expired: {
              type: 'boolean',
            },
            evaluator_name: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        relationships: {
          type: 'object',
          required: ['solicitation', 'evaluator', 'evaluated'],
          additionalProperties: false,
          properties: {
            solicitation: {
              type: 'object',
              required: ['data'],
              additionalProperties: false,
              properties: {
                data: {
                  type: 'object',
                  required: ['id', 'type'],
                  additionalProperties: false,
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    type: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            evaluator: {
              type: 'object',
              required: ['data'],
              additionalProperties: false,
              properties: {
                data: {
                  type: 'object',
                  required: ['id', 'type'],
                  additionalProperties: false,
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    type: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            evaluated: {
              type: 'object',
              required: ['data'],
              additionalProperties: false,
              properties: {
                data: {
                  type: 'object',
                  required: ['id', 'type'],
                  additionalProperties: false,
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    type: {
                      type: 'string',
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
            additionalProperties: false,
            properties: {
              mandatory_comment: {
                type: 'boolean',
              },
              scale: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              avatar: {
                type: 'null',
              },
              employed_since: {
                type: 'string',
              },
              department_id: {
                type: 'null',
              },
              department: {
                type: 'string',
              },
              position_id: {
                type: 'integer',
              },
              position: {
                type: 'string',
              },
              profiler: {
                type: 'null',
              },
              direct_leader: {
                type: 'string',
              },
            },
          },
          relationships: {
            type: 'object',
            required: ['position'],
            additionalProperties: false,
            properties: {
              position: {
                type: 'object',
                required: ['links', 'data'],
                additionalProperties: false,
                properties: {
                  links: {
                    type: 'object',
                    required: ['related', 'skill_groups'],
                    additionalProperties: false,
                    properties: {
                      related: {
                        type: 'string',
                      },
                      skill_groups: {
                        type: 'string',
                      },
                    },
                  },
                  data: {
                    type: 'object',
                    required: ['id', 'type'],
                    additionalProperties: false,
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      type: {
                        type: 'string',
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
};

export default get_evaluations_solicitation_evaluator_evaluated;
