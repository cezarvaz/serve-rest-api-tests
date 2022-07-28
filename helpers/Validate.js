import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import betterAjvErrors from 'better-ajv-errors';

class Validate {
  jsonSchema(response, schema) {
    const ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: true,
      strictRequired: true,
    });
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const valid = validate(response);

    return (
      valid ||
      betterAjvErrors(schema, response, validate.errors, { format: 'js' })
    );
  }
}

export default new Validate();
