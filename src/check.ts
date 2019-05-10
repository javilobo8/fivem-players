import axios from 'axios';
import BPromise from 'bluebird';
import { IServerElement } from './types';

async function getPlayers(server: IServerElement) {
  let players: number = null;

  try {
    const response = await axios({
      url: `${server.host}/players.json`,
      timeout: 1000,
    });

    players = response.data.length;
  } catch (error) {
    console.log(error.message);
  }

  return {
    ...server,
    players
  } as IServerElement;
}

export default function getAllPlayers(servers: IServerElement[]) {
  return BPromise.map(servers, getPlayers);
}
