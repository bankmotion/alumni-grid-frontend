export interface PlayerInfo {
  historyId: number;
  playerId: number;
  firstname: string;
  lastname: string;
  wrongStatus: string[];
  rightStatus: string;
  timestamp: number;
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
