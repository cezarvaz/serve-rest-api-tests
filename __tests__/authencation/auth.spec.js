// // import validate from 'helpers/Validate';
// // import each from 'jest-each';
// // import supertest from 'supertest';
// // import { UNAUTHORIZED_TOKEN, EXPIRED_TOKEN } from 'utils/constants';
// // import authenticationFactory from 'factories/authentication-factory';
// // import httpStatusCode from 'utils/http-status-code';
// // import errorSchema from 'schemas/errors/error';
// // import simpleErrorSchema from 'schemas/errors/simple-error';

// // const BASE_URL = 'https://apigwstg.solides.com.br/management';
// // const {
// //   routesWithAuthenticationMethodGet,
// //   routesWithAuthenticationMethodPost,
// //   routesWithAuthenticationMethodPut,
// //   routesWithAuthenticationMethodDelete,
// //   errorMessageExpiredToken,
// //   errorMessageUnauthorized,
// // } = authenticationFactory.dataAuthentication;

// // describe('Authentication tests', () => {
//   // describe('Unauthorized token', () => {
//   //   each(routesWithAuthenticationMethodGet).it(
//   //     'should return when trying get route %s with unauthorized token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .get(route)
//   //         .set('Authorization', UNAUTHORIZED_TOKEN);
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageUnauthorized);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPost).it(
//   //     'should return an error when trying post route %s with unauthorized token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .post(route)
//   //         .set('Authorization', UNAUTHORIZED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageUnauthorized);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPut).it(
//   //     'should return an error when trying put route %s with unauthorized token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .put(route)
//   //         .set('Authorization', UNAUTHORIZED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageUnauthorized);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodDelete).it(
//   //     'should return an error when trying delete route %s with unauthorized token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .delete(route)
//   //         .set('Authorization', UNAUTHORIZED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageUnauthorized);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   // });
//   // describe('Expired token', () => {
//   //   each(routesWithAuthenticationMethodGet).it(
//   //     'should return an error when trying get route %s with expired token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .get(route)
//   //         .set('Authorization', EXPIRED_TOKEN);
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageExpiredToken);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPost).it(
//   //     'should return an error when trying post route %s with expired token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .post(route)
//   //         .set('Authorization', EXPIRED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageExpiredToken);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPut).it(
//   //     'should return an error when trying put route %s with expired token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .put(route)
//   //         .set('Authorization', EXPIRED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageExpiredToken);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodDelete).it(
//   //     'should return an error when trying delete route %s with expired token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .delete(route)
//   //         .set('Authorization', EXPIRED_TOKEN)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.errors).toBe(errorMessageExpiredToken);
//   //       expect(validate.jsonSchema(body, simpleErrorSchema)).toBeTrue();
//   //     }
//   //   );
//   // });
//   // describe('Null token', () => {
//   //   each(routesWithAuthenticationMethodGet).it(
//   //     'should return an error when trying get route %s with null token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .get(route)
//   //         .set('Authorization', null);
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPost).it(
//   //     'should return an error when trying post route %s with null token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .post(route)
//   //         .set('Authorization', null)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPut).it(
//   //     'should return an error when trying put route %s with null token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .put(route)
//   //         .set('Authorization', null)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodDelete).it(
//   //     'should return an error when trying delete route %s with null token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .delete(route)
//   //         .set('Authorization', null)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   // });
//   // describe.only('Empty token', () => {
//   //   each(routesWithAuthenticationMethodGet).it(
//   //     'should return an error when trying get route %s with empty token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .get(route)
//   //         .set('Authorization', '');
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.error.message).toBe('Unauthorized');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPost).it(
//   //     'should return an error when trying post route %s with empty token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .post(route)
//   //         .set('Authorization', '')
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.error.message).toBe('Unauthorized');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPut).it(
//   //     'should return an error when trying put route %s with empty token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .put(route)
//   //         .set('Authorization', '')
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.error.message).toBe('Unauthorized');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodDelete).it(
//   //     'should return an error when trying delete route %s with empty token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .delete(route)
//   //         .set('Authorization', '')
//   //         .send({});
//   //       console.log(route);
//   //       console.log(body);
//   //       expect(status).toBe(httpStatusCode.UNAUTHORIZED);
//   //       expect(body.error.message).toBe('Unauthorized');
//   //       expect(validate.jsonSchema(body, errorSchema)).toBeTrue();
//   //     }
//   //   );
//   // });
//   // describe('Invalid token', () => {
//   //   const invalidToken = 'An invalid token';
//   //   each(routesWithAuthenticationMethodGet).it(
//   //     'should return an error when trying get route %s with invalid token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .get(route)
//   //         .set('Authorization', invalidToken);
//   //       console.log(body);
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPost).it(
//   //     'should return an error when trying post route %s with invalid token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .post(route)
//   //         .set('Authorization', invalidToken)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodPut).it(
//   //     'should return an error when trying put route %s with invalid token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .put(route)
//   //         .set('Authorization', invalidToken)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //     }
//   //   );
//   //   each(routesWithAuthenticationMethodDelete).it(
//   //     'should return an error when trying delete route %s with invalid token',
//   //     async (route) => {
//   //       const { status, body } = await supertest(BASE_URL)
//   //         .delete(route)
//   //         .set('Authorization', invalidToken)
//   //         .send({});
//   //       expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //       expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //       expect(body.error.message).toBe('RESOURCE Forbidden');
//   //     }
//   //   );
//   // });
//   // describe('unique token authentication', () => {
//   //   describe('gestao Token', () => {
//   //     describe('unauthorized token', () => {
//   //       each(routesWithAuthenticationMethodGet).it(
//   //         'should be validated The "Gestao-Token" header in route GET %s with unauthorized token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .get(route)
//   //             .set('Gestao-Token', UNAUTHORIZED_TOKEN);
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPost).it(
//   //         'should be validated The "Gestao-Token" header in route POST %s with unauthorized token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .post(route)
//   //             .set('Gestao-Token', UNAUTHORIZED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPut).it(
//   //         'should be validated The "Gestao-Token" header in route PUT %s with unauthorized token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .put(route)
//   //             .set('Gestao-Token', UNAUTHORIZED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodDelete).it(
//   //         'should be validated The "Gestao-Token" header in route DELETE %s with unauthorized token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .delete(route)
//   //             .set('Gestao-Token', UNAUTHORIZED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //     });
//   //     describe('expired token', () => {
//   //       each(routesWithAuthenticationMethodGet).it(
//   //         'should be validated The "Gestao-Token" header in route GET %s with expired token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .get(route)
//   //             .set('Gestao-Token', EXPIRED_TOKEN);
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPost).it(
//   //         'should be validated The "Gestao-Token" header in route POST %s with expired token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .post(route)
//   //             .set('Gestao-Token', EXPIRED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPut).it(
//   //         'should be validated The "Gestao-Token" header in route PUT %s with expired token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .put(route)
//   //             .set('Gestao-Token', EXPIRED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodDelete).it(
//   //         'should be validated The "Gestao-Token" header in route DELETE %s with expired token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .delete(route)
//   //             .set('Gestao-Token', EXPIRED_TOKEN)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //     });
//   //     describe('invalid token', () => {
//   //       const invalidToken = 'An invalid token';
//   //       each(routesWithAuthenticationMethodGet).it(
//   //         'should be validated The "Gestao-Token" header in route GET %s with invalid token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .get(route)
//   //             .set('Gestao-Token', invalidToken);
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPost).it(
//   //         'should be validated The "Gestao-Token" header in route POST %s with invalid token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .post(route)
//   //             .set('Gestao-Token', invalidToken)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPut).it(
//   //         'should be validated The "Gestao-Token" header in route PUT %s with invalid token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .put(route)
//   //             .set('Gestao-Token', invalidToken)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodDelete).it(
//   //         'should be validated The "Gestao-Token" header in route DELETE %s with invalid token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .delete(route)
//   //             .set('Gestao-Token', invalidToken)
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //     });
//   //     describe('empty token', () => {
//   //       each(routesWithAuthenticationMethodGet).it(
//   //         'should be validated The "Gestao-Token" header in route GET %s with empty token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .get(route)
//   //             .set('Gestao-Token', '');
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPost).it(
//   //         'should be validated The "Gestao-Token" header in route POST %s with empty token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .post(route)
//   //             .set('Gestao-Token', '')
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodPut).it(
//   //         'should be validated The "Gestao-Token" header in route PUT %s with empty token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .put(route)
//   //             .set('Gestao-Token', '')
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //       each(routesWithAuthenticationMethodDelete).it(
//   //         'should be validated The "Gestao-Token" header in route DELETE %s with empty token',
//   //         async (route) => {
//   //           const { status, body } = await supertest(BASE_URL)
//   //             .delete(route)
//   //             .set('Gestao-Token', '')
//   //             .send({});
//   //           expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //           expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //           expect(body.error.message).toBe('Unauthorized');
//   //         }
//   //       );
//   //     });
//   //   });
//   //   describe('Gestao-Token and Authorization both exist in the header', () => {
//   //     let invalidToken = 'An invalid token';
//   //     each(routesWithAuthenticationMethodGet).it(
//   //       'should be validated The "Gestao-Token" and "Authorization" in header in route GET %s with invalid token',
//   //       async (route) => {
//   //         const { status, body } = await supertest(BASE_URL)
//   //           .get(route)
//   //           .set('Gestao-Token', invalidToken)
//   //           .set('Authorization', invalidToken.concat(' authorization'));
//   //         expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //         expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       }
//   //     );
//   //     each(routesWithAuthenticationMethodPost).it(
//   //       'should be validated The "Gestao-Token" and "Authorization" in header in route POST %s with invalid token',
//   //       async (route) => {
//   //         const { status, body } = await supertest(BASE_URL)
//   //           .post(route)
//   //           .set('Gestao-Token', invalidToken)
//   //           .set('Authorization', invalidToken.concat(' authorization'))
//   //           .send({});
//   //         expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //         expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       }
//   //     );
//   //     each(routesWithAuthenticationMethodPut).it(
//   //       'should be validated The "Gestao-Token" and "Authorization" in header in route PUT %s with invalid token',
//   //       async (route) => {
//   //         const { status, body } = await supertest(BASE_URL)
//   //           .put(route)
//   //           .set('Gestao-Token', invalidToken)
//   //           .set('Authorization', invalidToken.concat(' authorization'))
//   //           .send({});
//   //         expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //         expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       }
//   //     );
//   //     each(routesWithAuthenticationMethodDelete).it(
//   //       'should be validated The "Gestao-Token" and "Authorization" in header in route DELETE %s with invalid token',
//   //       async (route) => {
//   //         const { status, body } = await supertest(BASE_URL)
//   //           .delete(route)
//   //           .set('Gestao-Token', invalidToken)
//   //           .set('Authorization', invalidToken.concat(' authorization'))
//   //           .send({});
//   //         expect(status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(validate.jsonSchema(body, gestaoErrorSchema)).toBeTrue();
//   //         expect(body.error.status).toBe(httpStatusCode.FORBIDDEN);
//   //         expect(body.error.message).toBe('RESOURCE Forbidden');
//   //       }
//   //     );
//   //   });
//   // });
// });
