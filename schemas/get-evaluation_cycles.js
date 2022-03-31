const getEvalutaionCyclesSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "http://example.com/example.json",
  type: "object",
  required: ["data", "meta"],
  properties: {
    data: {
      $id: "#/properties/data",
      type: "array",
      items: {
        $id: "#/properties/data/items",
        type: "object",
        required: ["id", "type", "attributes"],
        properties: {
          id: {
            $id: "#/properties/data/items/properties/id",
            type: "integer",
          },
          type: {
            $id: "#/properties/data/items/properties/type",
            type: "string",
          },
          attributes: {
            $id: "#/properties/data/items/properties/attributes",
            type: "object",
            required: [
              "name",
              "description",
              "description_html",
              "description_json",
              "send_email_begin_date",
              "company_id",
              "begin_date",
              "end_date",
              "self_evaluation",
              "type_evaluation",
              "status_evaluation",
              "scale",
              "last_step",
              "created_at",
              "updated_at",
            ],
            properties: {
              name: {
                $id: "#/properties/data/items/properties/attributes/properties/name",
                type: "string",
              },
              description: {
                $id: "#/properties/data/items/properties/attributes/properties/description",
                type: "string",
              },
              description_html: {
                $id: "#/properties/data/items/properties/attributes/properties/description_html",
                type: "string",
              },
              description_json: {
                $id: "#/properties/data/items/properties/attributes/properties/description_json",
                type: "string",
              },
              send_email_begin_date: {
                $id: "#/properties/data/items/properties/attributes/properties/send_email_begin_date",
                type: "boolean",
              },
              company_id: {
                $id: "#/properties/data/items/properties/attributes/properties/company_id",
                type: "integer",
              },
              begin_date: {
                $id: "#/properties/data/items/properties/attributes/properties/begin_date",
              },
              end_date: {
                $id: "#/properties/data/items/properties/attributes/properties/end_date",
              },
              self_evaluation: {
                $id: "#/properties/data/items/properties/attributes/properties/self_evaluation",
                type: "boolean",
              },
              type_evaluation: {
                $id: "#/properties/data/items/properties/attributes/properties/type_evaluation",
                type: "string",
              },
              status_evaluation: {
                $id: "#/properties/data/items/properties/attributes/properties/status_evaluation",
                type: "string",
              },
              scale: {
                $id: "#/properties/data/items/properties/attributes/properties/scale",
                type: "null",
              },
              last_step: {
                $id: "#/properties/data/items/properties/attributes/properties/last_step",
                type: "string",
              },
              created_at: {
                $id: "#/properties/data/items/properties/attributes/properties/created_at",
                type: "string",
              },
              updated_at: {
                $id: "#/properties/data/items/properties/attributes/properties/updated_at",
                type: "string",
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
    meta: {
      $id: "#/properties/meta",
      type: "object",
      required: ["pagination"],
      properties: {
        pagination: {
          $id: "#/properties/meta/properties/pagination",
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
              $id: "#/properties/meta/properties/pagination/properties/current",
              type: "integer",
            },
            previous: {
              $id: "#/properties/meta/properties/pagination/properties/previous",
              type: "null",
            },
            next: {
              $id: "#/properties/meta/properties/pagination/properties/next",
              type: "null",
            },
            per_page: {
              $id: "#/properties/meta/properties/pagination/properties/per_page",
              type: "integer",
            },
            pages: {
              $id: "#/properties/meta/properties/pagination/properties/pages",
              type: "integer",
            },
            total_count: {
              $id: "#/properties/meta/properties/pagination/properties/total_count",
              type: "integer",
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};
export default getEvalutaionCyclesSchema;
