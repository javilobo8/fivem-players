import React, { useEffect, useState } from 'react';

import ServerItem from './components/ServerItem';
import { AppContainer, GlobalStyle } from './styles';
import { IServer } from './types';

import io from 'socket.io-client';
import useLocalStorage from './hooks/useLocalStorage';

const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST || 'http://localhost:8000';

const MAX_PLAYERS = 32;

const bellAudio = new Audio('http://soundbible.com/mp3/Electronic_Chime-KevanGC-495939803.mp3');

const socket = io.connect(SOCKET_HOST);

export default function App() {
  const [serverBells, setServerBells] = useLocalStorage('server_bells', []) as [string[], any];
  const [servers, setServers] = useState([]) as [IServer[], any];

  function checkData() {
    let shouldBell = false;

    servers.forEach((item) => {
      if (!shouldBell && item.playerLeft && serverBells.includes(item.name)) {
        shouldBell = true;
      }
    });

    if (shouldBell) {
      console.log('drin drin');
      bellAudio.play();
    }
  }

  function setBell(name: string) {
    const index = serverBells.indexOf(name);

    if (index === -1) {
      setServerBells([...serverBells, name]);
    } else {
      const newServerBells = [...serverBells];
      newServerBells.splice(index, 1);
      setServerBells(newServerBells);
    }
  }

  useEffect(() => {
    socket.on('update', (data: IServer[]) => {
      setServers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  checkData();

  return (
    <div>
      <GlobalStyle />
      <AppContainer>
        <h2 style={{ textAlign: 'center' }}>Servers</h2>
        <h4 style={{ textAlign: 'center' }}>Pulsar 🔕 para que solo suenen los que tengan 🔔</h4>
        <div>
          {servers.map((item) => (
            <ServerItem
              key={item.host}
              maxPlayers={MAX_PLAYERS}
              toggle={setBell}
              active={serverBells.indexOf(item.name) !== -1}
              {...item}
            />
          ))}
        </div>
      </AppContainer>
    </div>
  );
}
