const sucessSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#success-put-skill-groups',
  type: 'object',
  required: ['data', 'included'],
  additionalProperties: true,
  properties: {
    data: {
      type: 'object',
      required: ['id', 'type', 'attributes'],
      additionalProperties: true,
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
            'external_id',
            'archived',
            'created_at',
            'updated_at',
          ],
          additionalProperties: true,
          properties: {
            name: {
              type: 'string',
            },
            external_id: {
              type: 'null',
            },
            archived: {
              type: 'boolean',
            },
            created_at: {
              type: 'string',
            },
            updated_at: {
              type: 'string',
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
export default sucessSchema;
