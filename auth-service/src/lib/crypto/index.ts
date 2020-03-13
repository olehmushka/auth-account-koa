import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export const hashString = async (text: string, salt: number = SALT_ROUND): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err: Error | undefined, encrypted: string) => {
      if (err) {
        reject(err);
      }
      resolve(encrypted);
    });
  });
};

export const compareWithHash = async (text: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash, (err: Error | undefined, isMatch: boolean) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
};
