const sucessSchema = {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://example.com/object1655986126.json",
  title: "Root",
  type: "object",
  required: ["data", "meta"],
  properties: {
    data: {
      $id: "#root/data",
      title: "Data",
      type: "array",
      default: [],
      items: {
        $id: "#root/data/items",
        title: "Items",
        type: "object",
        required: ["id", "type", "attributes"],
        properties: {
          id: {
            $id: "#root/data/items/id",
            title: "Id",
            type: "integer",
            examples: [166],
            default: 0,
          },
          type: {
            $id: "#root/data/items/type",
            title: "Type",
            type: "string",
            default: "",
            examples: ["group_criterias"],
            pattern: "^.*$",
          },
          attributes: {
            $id: "#root/data/items/attributes",
            title: "Attributes",
            type: "object",
            required: [
              "name",
              "external_id",
              "active",
              "created_at",
              "updated_at",
            ],
            properties: {
              name: {
                $id: "#root/data/items/attributes/name",
                title: "Name",
                type: "string",
                default: "",
                examples: ["b"],
                pattern: "^.*$",
              },
              external_id: {
                $id: "#root/data/items/attributes/external_id",
                title: "External_id",
                type: "null",
                default: null,
              },
              active: {
                $id: "#root/data/items/attributes/active",
                title: "Active",
                type: "boolean",
                examples: [false],
                default: true,
              },
              created_at: {
                $id: "#root/data/items/attributes/created_at",
                title: "Created_at",
                type: "string",
                default: "",
                examples: ["2022-05-20T08:57:06.289-03:00"],
                pattern: "^.*$",
              },
              updated_at: {
                $id: "#root/data/items/attributes/updated_at",
                title: "Updated_at",
                type: "string",
                default: "",
                examples: ["2022-05-27T12:05:07.076-03:00"],
                pattern: "^.*$",
              },
            },
          },
        },
      },
    },
    meta: {
      $id: "#root/meta",
      title: "Meta",
      type: "object",
      required: ["pagination"],
      properties: {
        pagination: {
          $id: "#root/meta/pagination",
          title: "Pagination",
          type: "object",
          required: [
            "current",
            "previous",
            "next",
            "per_page",
            "pages",
            "total_count",
          ],
          properties: {
            current: {
              $id: "#root/meta/pagination/current",
              title: "Current",
              type: "integer",
              examples: [1],
              default: 0,
            },
            previous: {
              $id: "#root/meta/pagination/previous",
              title: "Previous",
              type: "null",
              default: null,
            },
            next: {
              $id: "#root/meta/pagination/next",
              title: "Next",
              type: "integer",
              examples: [2],
              default: 0,
            },
            per_page: {
              $id: "#root/meta/pagination/per_page",
              title: "Per_page",
              type: "integer",
              examples: [20],
              default: 0,
            },
            pages: {
              $id: "#root/meta/pagination/pages",
              title: "Pages",
              type: "integer",
              examples: [9],
              default: 0,
            },
            total_count: {
              $id: "#root/meta/pagination/total_count",
              title: "Total_count",
              type: "integer",
              examples: [167],
              default: 0,
            },
          },
        },
      },
    },
  },
};
export default sucessSchema;
