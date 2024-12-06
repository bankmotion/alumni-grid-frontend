import { CollegeStatus } from "../constant/const";

export interface PlayerInfo {
  id: number;
  name: string;
  college: number;
}

export interface College {
  id: number;
  name: string;
  status?: CollegeStatus[];
}
