const get_report_csv_solicitations_evaluations = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: '#get-report-csv-solicitations-evaluations',
  type: 'object',
  required: ['content', 'message', 'status'],
  additionalProperties: false,
  properties: {
    content: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
};

export default get_report_csv_solicitations_evaluations;
