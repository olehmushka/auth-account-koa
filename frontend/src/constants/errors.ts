export const email = {
  invalid: 'invalid email',
};

export const password = {
  length: 'wrong password. Must have at least 6 characters',
};

export const total = {
  positive: 'value must be positive',
};

export const ratio = {
  positive: 'value must be higher than 0',
  lessThan: 'value must be less or equal to 100',
};

export const month = {
  lessThan: 'month must be less than 12',
};

export const server = {
  response: 'server does not respond',
  somethingWentWrong: 'something went wrong',
  data: 'wrong credentials',
  user: {
    exists: 'user with this username already exists',
  },
};

export const general = {
  symbol: 'field was incorrect symbol',
  required: 'field is required',
  length: 'wrong length',
};

export default {
  email,
  password,
  total,
  server,
  general,
  ratio,
};
