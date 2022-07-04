import Ajv from 'ajv';
import addFormats from 'ajv-formats';

class Validate {
  jsonSchema(body, schema) {
    const ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: true,
      strictRequired: true,
    });
    addFormats(ajv);

    const valid = ajv.validate(schema, body);
    if (!valid)
      return {
        valid,
        err_msg: ajv.errors,
      };
    return valid;
  }
}

export default new Validate();
