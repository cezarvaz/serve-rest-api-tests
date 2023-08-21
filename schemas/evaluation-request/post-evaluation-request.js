const post_evaluation_requests = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'success-post-evaluation-request',
  type: 'object',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'object',
      required: ['message', 'contents', 'status'],
      additionalProperties: false,
      properties: {
        message: {
          type: 'string',
        },
        contents: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
      },
    },
  },
};

export default post_evaluation_requests;
