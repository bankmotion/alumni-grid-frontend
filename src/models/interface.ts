export interface PlayerInfo {
  historyId: number;
  playerId: number;
  firstname: string;
  lastname: string;
  wrongStatus: string[];
  rightStatus: string;
}

export interface College {
  id: number;
  name: string;
}

export interface GameSetting {
  createTime: number;
  remainCount: number;
  score: number;
  endStatus: boolean;
  playerList: PlayerInfo[];
  gameStartTime: number;
}

export interface AllHistory {
  timeStamp: number;
  players: AllPlayer[];
}

export interface AllPlayer {
  id: number;
  firstname: string;
  lastname: string;
}
