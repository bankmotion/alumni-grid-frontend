import dotenv from "dotenv";
dotenv.config();

export const SERVER_URL = `http://${
  process.env.LIVE_MODE === "true" ? "147.182.188.81" : "localhost"
}:5000`;
