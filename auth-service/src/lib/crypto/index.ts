import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUND = 10;
const PRIVATE_KEY_FILENAME = 'jwtRS256.key';
const CERTEFICATE_FILENAME = 'jwtRS256.pem';
const HASH_ALGORITHM = 'RS256';

export const hashString = async (
  text: string,
  salt: number = SALT_ROUND,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err: Error | undefined, encrypted: string) => {
      if (err) {
        reject(err);
      }
      resolve(encrypted);
    });
  });
};

export const compareWithHash = async (
  text: string,
  hash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash, (err: Error | undefined, isMatch: boolean) => {
      if (err) {
        reject(err.message);
      }
      resolve(isMatch);
    });
  });
};

const getFile = (filename: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const sign = async (data: string): Promise<string> => {
  try {
    const privateKey = await getFile(PRIVATE_KEY_FILENAME);
    return jwt.sign(data, privateKey, { algorithm: HASH_ALGORITHM });
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const verify = async (token: string): Promise<string> => {
  try {
    const publicKey = await getFile(CERTEFICATE_FILENAME);
    return jwt.verify(token, publicKey, {
      algorithms: [HASH_ALGORITHM],
    }) as string;
  } catch ({ message }) {
    throw new Error(message);
  }
};
