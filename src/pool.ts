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
          this.currentData = data;
          this.prevData = jsonData;
          this.io.emit('update', data);
          console.log('Data updated!');
        }
      });
  }
}
