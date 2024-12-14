import { CollegeStatus } from "../constant/const";

export interface PlayerInfo {
  id: number;
  name: string;
}

export interface College {
  id: number;
  name: string;
  status?: CollegeStatus[];
}
