import * as http from 'http';
import { default as socketio, Socket } from 'socket.io';

import check from './check';
import config from './config';
import { IServerElement } from './types';

export default class Pool {
  private io: SocketIO.Server;
  private clients: number;
  private poolingInterval: NodeJS.Timeout;
  private currentData: IServerElement[];
  private prevData: string;
  private servers: IServerElement[];

  constructor(server: http.Server, servers: IServerElement[]) {
    this.servers = servers;
    this.io = socketio(server);
    this.clients = 0;
    this.poolingInterval = null;

    this.currentData = [];
    this.prevData = '';

    this.io.on('connection', this.onConnect.bind(this));
  }

  private onConnect(socket: Socket) {
    socket.once('disconnect', this.onDisconnect.bind(this));
    this.clients += 1;
    console.log('Client connected');
    socket.emit('update', this.currentData);
    this.updateStauts();
  }

  private onDisconnect() {
    this.clients -= 1;
    console.log('Client disconnected');
    this.updateStauts();
  }

  private updateStauts() {
    console.log('clients', this.clients);
    if (this.clients === 0) {
      this.stopInterval();
    } else if (this.clients === 1) {
      this.startInterval();
    }
  }

  private startInterval() {
    if (!this.poolingInterval) {
      this.run();
      this.poolingInterval = setInterval(this.run.bind(this), config.refreshInterval);
      console.log('Start pooling');
    }
  }

  private stopInterval() {
    clearInterval(this.poolingInterval);
    this.poolingInterval = null;
    console.log('Stop pooling');
  }

  private run() {
    check(this.servers)
      .then((data: IServerElement[]) => {
        const jsonData = JSON.stringify(data);

        if (this.prevData !== jsonData) {
          const newData = [...data];

          data.forEach((item, index) => {
            const currentItem = this.currentData.find((server) => server.name === item.name);

            if (currentItem && typeof currentItem.players === 'number') {
              if (currentItem.players >= config.maxPlayers && item.players < config.maxPlayers) {
                newData[index].playerLeft = true;
              } else {
                newData[index].playerLeft = false;
              }
            }
          });

          this.currentData = newData;
          this.prevData = jsonData;

          console.log('Data updated!', this.currentData);
          this.io.emit('update', this.currentData);
        }
      });
  }
}
