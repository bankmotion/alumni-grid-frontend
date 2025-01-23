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
