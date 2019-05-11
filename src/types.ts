export interface IServerElement {
  host: string;
  name: string;
  playerLeft?: boolean;
  players?: number;
}

export interface IConfig {
  port: number;
  refreshInterval: number;
  socketHost: string;
  maxPlayers: number;
}
