module.exports = {
    'recruitment-api': {
        input: './openapi.yaml',
    output: {
      mode: 'single',
      target: 'src/api/generated/endpoints.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      mock: true,
    },
    },
};
