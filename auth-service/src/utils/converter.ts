export const camelToSnakeCase = (camelCaseStr: string): string => {
  return camelCaseStr.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const snakeToCamelCase = (snakeCaseStr: string): string =>
  snakeCaseStr.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

export const objectPropertiesConvertCase = (
  obj: Object | any,
  func: (str: string) => string,
): Object => {
  const snakeCaseObj: any = {};
  for (const prop in obj) {
    snakeCaseObj[func(prop)] = obj[prop];
  }
  return snakeCaseObj;
};

export const camelCasePropertiesToSnakeCase = (
  camelCaseObj: Object | any,
): Object => objectPropertiesConvertCase(camelCaseObj, camelToSnakeCase);

export const snakeCasePropertiesToCamelCase = (
  snakeCaseObj: Object | any,
): Object => objectPropertiesConvertCase(snakeCaseObj, snakeToCamelCase);

// Koa's `ctx.request.query` values are typed as `string | string[] | undefined`;
// this normalizes a single query param into a `number` for handlers that expect one.
export const queryParamToNumber = (
  value: string | string[] | undefined,
): number | undefined => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (rawValue === undefined) {
    return undefined;
  }
  const parsed = Number(rawValue);
  return Number.isNaN(parsed) ? undefined : parsed;
};
