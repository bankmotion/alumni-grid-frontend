export const SERVER_URL = `${process.env.REACT_APP_API_URL}`;
export const MAX_COUNT = 9;
export const DURATION_TIME = 24 * 3600;
export const MIN_SCORE_PER_QUE = 10;
export const MAX_SCORE_PER_QUE = 100;
export const DECREASE_TIME = 5;
export const Version = 1.01;
export const NFLPositions = {
  Center: "Center",
  Cornerback: "Cornerback",
  DefensiveBack: "Defensive Back",
  DefensiveEnd: "Defensive End",
  DefensiveLineman: "Defensive Lineman",
  DefensiveTackle: "Defensive Tackle",
  FreeSafety: "Free Safety",
  Fullback: "Fullback",
  Guard: "Guard",
  KickReturner: "Kick Returner",
  Linebacker: "Linebacker",
  LongSnapper: "Long Snapper",
  NoseTackle: "Nose Tackle",
  OffensiveGuard: "Offensive Guard",
  OffensiveLineman: "Offensive Lineman",
  OffensiveTackle: "Offensive Tackle",
  PlaceKicker: "Place Kicker",
  Punter: "Punter",
  Quarterback: "Quarterback",
  RunningBack: "Running Back",
  Safety: "Safety",
  StrongSafety: "Strong Safety",
  TightEnd: "Tight End",
  Unknown: "Unknown",
  WideReceiver: "Wide Receiver",
} as const;
