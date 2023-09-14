const get_solicitations_evaluateds_details = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-solicitations-evaluateds-details',
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
            'name',
            'avatar',
            'position_id',
            'position',
            'department_id',
            'department',
            'employed_since',
            'direct_leader_id',
            'direct_leader',
            'profiler',
            'unit_id',
            'idp_id',
            'unit_name',
          ],
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
            },
            avatar: {
              type: 'null',
            },
            position_id: {
              type: 'integer',
            },
            position: {
              type: 'null',
            },
            department_id: {
              type: 'null',
            },
            department: {
              type: 'null',
            },
            employed_since: {
              type: 'null',
            },
            direct_leader_id: {
              type: 'null',
            },
            direct_leader: {
              type: 'null',
            },
            profiler: {
              type: 'null',
            },
            unit_id: {
              type: ['integer', 'null'],
            },
            idp_id: {
              type: 'null',
            },
            unit_name: {
              type: 'null',
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
export default get_solicitations_evaluateds_details;
