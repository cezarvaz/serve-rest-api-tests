const successSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '#success-list-skill-groups',
  title: 'Root',
  type: 'object',
  required: ['data', 'included', 'meta'],
  properties: {
    data: {
      $id: '#root/data',
      title: 'Data',
      type: 'array',
      items: {
        $id: '#root/data/items',
        title: 'Items',
        type: 'object',
        required: ['id', 'type', 'attributes', 'relationships'],
        properties: {
          id: {
            $id: '#root/data/items/id',
            title: 'Id',
            type: 'integer',
          },
          type: {
            $id: '#root/data/items/type',
            title: 'Type',
            type: 'string',
          },
          attributes: {
            $id: '#root/data/items/attributes',
            title: 'Attributes',
            type: 'object',
            required: [
              'name',
              'description',
              'factor',
              'external_id',
              'archived',
              'created_at',
              'updated_at',
            ],
            properties: {
              name: {
                $id: '#root/data/items/attributes/name',
                title: 'Name',
                type: 'string',
              },
              description: {
                $id: '#root/data/items/attributes/description',
                title: 'Description',
                type: 'string',
              },
              factor: {
                $id: '#root/data/items/attributes/factor',
                title: 'Factor',
                type: 'integer',
              },
              external_id: {
                $id: '#root/data/items/attributes/external_id',
                title: 'External_id',
                type: ['integer', 'null'],
              },
              archived: {
                $id: '#root/data/items/attributes/archived',
                title: 'Archived',
                type: 'boolean',
              },
              created_at: {
                $id: '#root/data/items/attributes/created_at',
                title: 'Created_at',
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                $id: '#root/data/items/attributes/updated_at',
                title: 'Updated_at',
                type: 'string',
                format: 'date-time',
              },
            },
          },
          relationships: {
            $id: '#root/data/items/relationships',
            title: 'Relationships',
            type: 'object',
            required: ['skill_group', 'positions'],
            properties: {
              skill_group: {
                $id: '#root/data/items/relationships/skill_group',
                title: 'Skill_group',
                type: 'object',
                required: ['links', 'data'],
                properties: {
                  links: {
                    $id: '#root/data/items/relationships/skill_group/links',
                    title: 'Links',
                    type: 'object',
                    required: ['related'],
                    properties: {
                      related: {
                        $id: '#root/data/items/relationships/skill_group/links/related',
                        title: 'Related',
                        type: 'string',
                      },
                    },
                  },
                  data: {
                    $id: '#root/data/items/relationships/skill_group/data',
                    title: 'Data',
                    type: 'object',
                    required: ['id', 'type'],
                    properties: {
                      id: {
                        $id: '#root/data/items/relationships/skill_group/data/id',
                        title: 'Id',
                        type: 'integer',
                      },
                      type: {
                        $id: '#root/data/items/relationships/skill_group/data/type',
                        title: 'Type',
                        type: 'string',
                      },
                    },
                  },
                },
              },
              positions: {
                $id: '#root/data/items/relationships/positions',
                title: 'Positions',
                type: 'object',
                required: ['data'],
                properties: {
                  data: {
                    $id: '#root/data/items/relationships/positions/data',
                    title: 'Data',
                    type: 'array',
                  },
                },
              },
            },
          },
        },
      },
    },
    included: {
      $id: '#root/included',
      title: 'Included',
      type: 'array',
      items: {
        $id: '#root/included/items',
        title: 'Items',
        type: 'object',
        required: ['id', 'type', 'attributes'],
        properties: {
          id: {
            $id: '#root/included/items/id',
            title: 'Id',
            type: 'integer',
          },
          type: {
            $id: '#root/included/items/type',
            title: 'Type',
            type: 'string',
          },
          attributes: {
            $id: '#root/included/items/attributes',
            title: 'Attributes',
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                $id: '#root/included/items/attributes/name',
                title: 'Name',
                type: 'string',
              },
              external_id: {
                $id: '#root/included/items/attributes/external_id',
                title: 'External_id',
                type: ['integer', 'null'],
              },
              archived: {
                $id: '#root/included/items/attributes/archived',
                title: 'Archived',
                type: 'boolean',
              },
              created_at: {
                $id: '#root/included/items/attributes/created_at',
                title: 'Created_at',
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                $id: '#root/included/items/attributes/updated_at',
                title: 'Updated_at',
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
    },
    meta: {
      $id: '#root/meta',
      title: 'Meta',
      type: 'object',
      required: ['pagination'],
      properties: {
        pagination: {
          $id: '#root/meta/pagination',
          title: 'Pagination',
          type: 'object',
          required: [
            'current',
            'previous',
            'next',
            'per_page',
            'pages',
            'total_count',
          ],
          properties: {
            current: {
              $id: '#root/meta/pagination/current',
              title: 'Current',
              type: 'integer',
            },
            previous: {
              $id: '#root/meta/pagination/previous',
              title: 'Previous',
              type: ['integer', 'null'],
            },
            next: {
              $id: '#root/meta/pagination/next',
              title: 'Next',
              type: ['integer', 'null'],
            },
            per_page: {
              $id: '#root/meta/pagination/per_page',
              title: 'Per_page',
              type: 'integer',
            },
            pages: {
              $id: '#root/meta/pagination/pages',
              title: 'Pages',
              type: 'integer',
            },
            total_count: {
              $id: '#root/meta/pagination/total_count',
              title: 'Total_count',
              type: 'integer',
            },
          },
        },
      },
    },
  },
};

export default successSchema;
