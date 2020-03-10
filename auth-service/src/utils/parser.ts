import { URL } from 'url';
import get from 'lodash/get';

export const urlParse = (url: string): URL => new URL(url);

export interface DbConfig {}

export const dbUrlParse = (url: string): DbConfig => {
  const parsed = urlParse(url);
  return {
    user: parsed.username,
    database: parsed.pathname.substring(1, parsed.pathname.length),
    password: parsed.password,
    host: parsed.hostname,
    port: Number(get(parsed, 'port', '0')),
  };
};
