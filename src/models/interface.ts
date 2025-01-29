import { Difficulty, PlayType } from "../constant/const";

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
  playingCount: number;
  correctCount: number;
  players: Player[];
}

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  correctCount: number;
  playingCount: number;
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
  active: number;
  difficulty: Difficulty;
  checkStatus?: boolean;
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
  active: number;
  difficulty: Difficulty;
  checkStatus?: boolean;
}
export interface PlayerOption {
  id?: number;
  position?: string;
  country?: string;
  draft?: number;
  isActive?: boolean;
  experience?: string;
  ageFrom?: number;
  ageTo?: number;
}
