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
