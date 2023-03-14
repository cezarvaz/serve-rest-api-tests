import { parse } from 'yaml';
import * as fs from 'fs';

function prepareDataAuth() {
  let json;
  const routesWithAuthentication = [];
  const ymlFile = fs.readFileSync('factories/swagger.yaml', {
    encoding: 'utf-8',
  });
  json = parse(ymlFile);
  for (const [key, value] of Object.entries(json.paths)) {
    const methods = Object.keys(value);
    for (const method of methods) {
      // if (
      //   value[method].parameters
      //     .map((x) => x.name == 'Authorization')
      //     .includes(true)
      // ) {
      routesWithAuthentication.push({
        method,
        route: key.replace('{id}', '1'),
      });
      // }
    }
  }
  const routesWithAuthFiltered = routesWithAuthentication.filter(
    (x) =>
      !authenticationPassList
        .map((y) => y.route.concat(y.method))
        .includes(x.route.concat(x.method))
  );
  return routesWithAuthFiltered;
}
const authenticationPassList = [];
// { method: 'get', route: '/surveys/app/v1/surveys' },
// ];

class AuthenticationFactory {
  get dataAuthentication() {
    const routesWithAuthFiltered = prepareDataAuth();
    return {
      routesWithAuthenticationMethodGet: routesWithAuthFiltered
        .filter((x) => x.method == 'get')
        .map((x) => x.route),
      routesWithAuthenticationMethodPost: routesWithAuthFiltered
        .filter((x) => x.method == 'post')
        .map((x) => x.route),
      routesWithAuthenticationMethodPut: routesWithAuthFiltered
        .filter((x) => x.method == 'put')
        .map((x) => x.route),
      routesWithAuthenticationMethodDelete: routesWithAuthFiltered
        .filter((x) => x.method == 'delete')
        .map((x) => x.route),
      authenticationPassList,
      errorMessageUnauthorized: 'decoding error',
      errorMessageExpiredToken: 'decoding error',
      errorMessageNullToken: 'decoding error',
      errorMessageEmptyToken: 'decoding error',
      errorMessageInvalidToken: 'decoding error',
    };
  }
}
export default new AuthenticationFactory();
