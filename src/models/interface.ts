import { PlayType } from "../constant/const";

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
  players: Player[];
}

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
}

export interface AllPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  height: string;
  weight: number;
  jerseyNumber: number;
  college: string;
  country: string;
  draftYear: number;
  draftRound: number;
  draftNumber: number;
  teamId: number;
}

export interface NFLAllPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  positionAbbreviation: string;
  height: string;
  weight: number;
  jerseyNumber: number;
  college: string;
  experience: string;
  age: number;
  teamId: number;
}
export interface PlayerOption {
  id: number;
  position: string;
  country: string;
  draft: number;
  // college: string;
  isActive: boolean;
}

export interface NFLPlayerOption {
  id: number;
  position: string;
  experience: string;
  ageFrom: number;
  ageTo: number;
}
