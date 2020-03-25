import {
  camelToSnakeCase,
  camelCasePropertiesToSnakeCase,
  snakeToCamelCase,
  snakeCasePropertiesToCamelCase,
} from './converter';

describe('utils/converter/camelToSnakeCase', () => {
  it('Success', () => {
    expect('camel_case').toBe(camelToSnakeCase('camelCase'));
  });
});

describe('utils/converter/camelCasePropertiesToSnakeCase', () => {
  it('Success', () => {
    expect({ one_case: null, two_case: null }).toMatchObject(
      camelCasePropertiesToSnakeCase({ oneCase: null, twoCase: null }),
    );
  });
});

describe('utils/converter/snakeToCamelCase', () => {
  it('Success', () => {
    expect('snakeCase').toBe(snakeToCamelCase('snake_case'));
  });
});

describe('utils/converter/snakeCasePropertiesToCamelCase', () => {
  it('Success', () => {
    expect({ oneCase: null, twoCase: null }).toMatchObject(
      snakeCasePropertiesToCamelCase({ one_case: null, two_case: null }),
    );
  });
});
