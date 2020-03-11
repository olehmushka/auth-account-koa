import { URL } from 'url';
import get from 'lodash/get';

export const urlParse = (url: string): URL => new URL(url);

export interface DbConfig {
  user: string;
  database: string;
  password: string;
  host: string;
  port: number;
}

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
