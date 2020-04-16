import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const LOG_PATH = path.join(__dirname, '../../logs');
const LOG_FILE = 'server.log';

const FULL_LOG_PATH = path.join(LOG_PATH, LOG_FILE);

const getDevLogger = () => morgan('dev');

const getFileStreamLogger = () => {
  if (!fs.existsSync(LOG_PATH)) {
    fs.mkdirSync(LOG_PATH);
    console.log('Log folder created.');
  }

  if (!fs.existsSync(FULL_LOG_PATH)) {
    try {
      fs.writeFileSync(FULL_LOG_PATH, '');
      console.log(`File ${FULL_LOG_PATH} was created`);
    } catch {
      console.log(`File ${FULL_LOG_PATH} was not created`);
    }
  }

  const logFileStream = fs.createWriteStream(FULL_LOG_PATH, { flags: 'a' });

  return morgan('combined', { stream: logFileStream });
};

export { getDevLogger, getFileStreamLogger };
