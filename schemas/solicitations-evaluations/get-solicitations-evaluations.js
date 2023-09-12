const get_solicitations_evaluations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-solicitations-evaluations',
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
            required: [
              'solicitation_id',
              'evaluator_id',
              'evaluator_name',
              'evaluated_id',
              'evaluated_name',
              'position_id',
              'position_name',
              'department_id',
              'unit_id',
              'direct_leader_id',
              'moderated',
              'status',
              'created_at',
              'updated_at',
            ],
            additionalProperties: false,
            properties: {
              solicitation_id: {
                type: 'integer',
              },
              evaluator_id: {
                type: 'integer',
              },
              evaluator_name: {
                type: 'string',
              },
              evaluated_id: {
                type: 'integer',
              },
              evaluated_name: {
                type: 'string',
              },
              position_id: {
                type: 'integer',
              },
              position_name: {
                type: 'string',
              },
              department_id: {
                type: 'integer',
              },
              unit_id: {
                type: 'null',
              },
              direct_leader_id: {
                type: 'integer',
              },
              moderated: {
                type: 'boolean',
              },
              status: {
                type: 'string',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                type: 'string',
                format: 'date-time',
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
          type: 'object',
          required: [
            'current',
            'previous',
            'next',
            'per_page',
            'pages',
            'total_count',
          ],
          additionalProperties: false,
          properties: {
            current: {
              type: 'integer',
            },
            previous: {
              type: 'null',
            },
            next: {
              type: 'null',
            },
            per_page: {
              type: 'integer',
            },
            pages: {
              type: 'integer',
            },
            total_count: {
              type: 'integer',
            },
          },
        },
      },
    },
  },
};

export default get_solicitations_evaluations;
