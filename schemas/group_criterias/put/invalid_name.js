const invalidNameSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '#invalid-id-put-group-criterias',
  title: 'Root',
  type: 'object',
  required: ['message', 'error'],
  properties: {
    message: {
      $id: '#root/message',
      title: 'Message',
      type: 'string',
      default: '',
      examples: ['Não foi atualizado(a).'],
      pattern: '^.*$',
    },
    error: {
      $id: '#root/error',
      title: 'Error',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          $id: '#root/error/name',
          title: 'Name',
          type: 'array',
          default: [],
          items: {
            $id: '#root/error/name/items',
            title: 'Items',
            type: 'string',
            default: '',
            examples: ['Este campo é obrigatório'],
            pattern: '^.*$',
          },
        },
      },
    },
  },
};
export default invalidNameSchema;
