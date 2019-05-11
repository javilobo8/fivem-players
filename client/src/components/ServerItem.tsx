import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

interface IServerItemContainerProps {
  playerLeft?: boolean;
}

const ServerItemContainer = styled.div<IServerItemContainerProps>`
  font-size: ${rem('22px')};
  padding: ${rem('10px')};
  height: ${rem('40px')};
  border: ${rem('1px')} solid grey;
  border-radius: ${rem('5px')};
  margin-bottom: ${rem('10px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: IServerItemContainerProps) => props.playerLeft ? 'lightgreen' : '#EEEEEE'};

  &:last-child {
    margin-bottom: 0px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div.attrs((props: any) => ({
  children: props.players,
}))`
  font-size: ${rem('24px')};
  background-color: ${(props: any) => props.players < props.maxPlayers ? 'green' : 'red'};
  height: ${rem('40px')};
  width: ${rem('40px')};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IBellProps {
  active: boolean;
  onClick: (name: string) => void;
}

const Bell = styled.div<IBellProps>`
  font-size: ${rem('16px')};
  background-color: ${(props: IBellProps) => props.active ? 'dodgerblue' : 'grey'};
  height: ${rem('30px')};
  width: ${rem('30px')};
  margin-right: ${rem('10px')};
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

interface IBellButtonProps {
  active: boolean;
  name: string;
  toggle: (name: string) => void;
}

function BellButton(props: IBellButtonProps) {
  return (
    <Bell
      active={props.active}
      onClick={() => props.toggle(props.name)}>
      {props.active ? '🔔' : '🔕'}
    </Bell>
  );
}

interface IServerItemProps {
  key: any;
  name: string;
  host: string;
  players?: number;
  playerLeft?: boolean;
  maxPlayers: number;
  active: boolean;
  toggle: (name: string) => void;
}

export default function ServerItem(props: IServerItemProps) {
  return (
    <ServerItemContainer playerLeft={props.playerLeft}>
      <div>
        <small>{props.name}</small>
        <div>{props.host}</div>
      </div>
      <RightSection>
        <BellButton active={props.active} name={props.name} toggle={props.toggle} />
        <Circle {...props} />
      </RightSection>
    </ServerItemContainer>
  );
}
