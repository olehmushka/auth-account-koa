import { getErrorResponse } from './index';
import { API as models } from '../../models/models';

describe('lib/validation/getErrorResponse', () => {
  const tests: {
    name: string;
    err: string | { message: string };
    messages?: string[];
    result: models.Error;
  }[] = [
    {
      name: 'Should be with messages',
      err: new Error('mockErr'),
      messages: ['a', 'b', 'c'],
      result: { message: 'mockErr', errors: ['a', 'b', 'c'] },
    },
    {
      name: 'Should be without messages',
      err: new Error('mockErr'),
      result: { message: 'mockErr', errors: [] },
    },
    {
      name: 'Should accept err as string',
      err: 'mockErr',
      result: { message: 'mockErr', errors: [] },
    },
  ];

  Promise.all(
    tests.map(async tt => {
      await it(tt.name, async () => {
        expect(getErrorResponse(tt.err, tt.messages)).toMatchObject(tt.result);
      });
    }),
  );
});
