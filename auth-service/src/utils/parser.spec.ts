import { URL } from 'url';
import { urlParse, dbUrlParse } from './parser';

const testUrl = 'http://user:pass@localhost:5432/db';

describe('utils/parser/urlParse', () => {
  it('Should create instance of URL class', () => {
    expect(urlParse(testUrl)).toBeInstanceOf(URL);
  });
});

describe('utils/parser/dbUrlParse', () => {
  it('Should parse URL string', () => {
    expect(dbUrlParse(testUrl)).toMatchObject({
      user: 'user',
      database: 'db',
      password: 'pass',
      host: 'localhost',
      port: 5432,
    });
  });
});
