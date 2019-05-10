import { IConfig } from './types';

function tryParse(value: string, type: any): any {
  if (typeof value === 'undefined') {
    return undefined;
  }

  return type(value);
}

function mergeConfig(base: IConfig, conf: IConfig|any) {
  const keys = Object.keys(base);
  const newConfig: any = {...base};

  for (const key of keys) {
    if (typeof conf[key] as any !== 'undefined') {
      newConfig[key] = conf[key];
    }
  }

  return newConfig;
}

const defaultConfig: IConfig = {
  port: 8000,
  refreshInterval: 3 * 1000,
  maxPlayers: 32,
  socketHost: `http://localhost:${8000}`,
};

const config: IConfig = {
  port: tryParse(process.env.PORT, Number),
  refreshInterval: tryParse(process.env.REFRESH_INTERVAL, Number),
  maxPlayers: tryParse(process.env.MAX_PLAYERS, Number),
  socketHost: tryParse(process.env.SOCKET_HOST, String),
};

export default mergeConfig(defaultConfig, config) as IConfig;
