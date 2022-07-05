import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import betterAjvErrors from 'better-ajv-errors';

class Validate {
  jsonSchema(body, schema) {
    const ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: true,
      strictRequired: true,
    });
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const valid = ajv.validate(schema, body);

    return valid || betterAjvErrors(schema, body, validate.errors);
  }
}

export default new Validate();
