export const camelToUnderscore = (camelCaseStr: string): string => {
  return camelCaseStr.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const camelCasePropertiesToSnakeCase = (
  camelCaseObj: Object | any,
): Object => {
  const snakeCaseObj: any = {};
  for (const snakeCaseStr in camelCaseObj) {
    snakeCaseObj[camelToUnderscore(snakeCaseStr)] = camelCaseObj[snakeCaseStr];
  }
  return snakeCaseObj;
};
