import { camelToUnderscore, camelCasePropertiesToSnakeCase } from './converter';

describe('utils/converter/camelToUnderscore', () => {
  it('Success', () => {
    expect('camel_case').toBe(camelToUnderscore('camelCase'));
  });
});

describe('utils/converter/camelCasePropertiesToSnakeCase', () => {
  it('Success', () => {
    expect({ one_case: null, two_case: null })
      .toMatchObject(camelCasePropertiesToSnakeCase({ oneCase: null, twoCase: null }));
  });
});
