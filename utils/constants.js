const CORRECT_EMAIL = 'erick.azevedo@esa-tecnologia.com';
const CORRECT_PASSWORD = 'erick.azevedo@esa-tecnologia.com';
const UNAUTHORIZED_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3NDkwOSwiY29tcGFueV9hZG1pbiI6dHJ1ZSwidXNlcl9lbWFpbCI6ImRpZWdvLmJhbWlycmFAc29saWRlcy5jb20uYnIiLCJ1c2VyX25hbWUiOiJEaWVnbyBUZXN0ZSIsInVzZXJfY29tcGFueV9uYW1lIjpudWxsLCJleHAiOjE3MDc1MjMyMDAsInVzZXJfY29tcGFueV9pZCI6MjgxNywidG9rZW5fdXNlIjoiYWNjZXNzIiwiaXNzIjoiR2VzdMOjbyBWMSIsImlhdCI6MTY0OTk2OTMyMX0.YtLmvx6G3a9JySqxgAR_Q_C48vRCv6hrkpUj1ebah8M';
const EXPIRED_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3NDkwOSwiY29tcGFueV9hZG1pbiI6ZmFsc2UsInVzZXJfZW1haWwiOiJkaWVnby5iYW1pcnJhQHNvbGlkZXMuY29tLmJyIiwidXNlcl9uYW1lIjoiRGllZ28gVGVzdGUiLCJ1c2VyX2NvbXBhbnlfbmFtZSI6IlZhbW8gQnJhc2lsIiwiZXhwIjoxNjQ2MzE1MjU5LCJ1c2VyX2NvbXBhbnlfaWQiOjEwODMzLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJpc3MiOiJHZXN0w6NvIFYxIiwiaWF0IjoxNjQ1NDUxMjU5fQ.Eqmw89WsgvJp8qeryFIGEdXaBSCn3KCJNeiY5v6tRao';
const SIGNED_USER = {
  email: CORRECT_EMAIL,
  password: CORRECT_PASSWORD,
};

export { UNAUTHORIZED_TOKEN, EXPIRED_TOKEN, SIGNED_USER };
