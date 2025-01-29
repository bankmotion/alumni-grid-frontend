export enum CollegeStatus {
  Initial,
  Right,
  Wrong,
}

export enum PlayType {
  NBA,
  NFL,
}

export const PlayTypeInfo = {
  [PlayType.NBA]: {
    up: "NBA",
    lo: "nba",
  },
  [PlayType.NFL]: {
    up: "NFL",
    lo: "nfl",
  },
};

export enum ActiveStatus {
  Actived = 1,
  Inactived = -1,
  Canceled = 0,
}

export enum Difficulty {
  None,
  Easy,
  Medium,
  Hard,
}

export const DifficultyName = {
  [Difficulty.None]: "None",
  [Difficulty.Easy]: "Easy",
  [Difficulty.Medium]: "Medium",
  [Difficulty.Hard]: "Hard",
};
