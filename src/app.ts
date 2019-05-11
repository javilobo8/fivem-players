import * as bodyParser from 'body-parser';
import cors from 'cors';
import { default as express, Express, Request, Response } from 'express';
import helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';

import config from './config';
import Pool from './pool';
import SERVERS from './servers.json';

const app: Express = express();
const server: http.Server = new http.Server(app);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/build')));

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
  const pool = new Pool(server, SERVERS);
});
