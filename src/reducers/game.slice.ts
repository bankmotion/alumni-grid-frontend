import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config/config";
import { College, PlayerInfo } from "../models/interface";
import { PlayType } from "../constant/const";
import { timeStamp } from "console";

export interface GameState {
  collegeList: College[];
  isGettingCollegeList: boolean;
  history: {
    items: PlayerInfo[];
    startTimestamp: number;
  };
  isGettingHistory: boolean;
}

const initialState: GameState = {
  collegeList: [],
  isGettingCollegeList: false,
  history: {
    items: [],
    startTimestamp: 0,
  },
  isGettingHistory: false,
};

export const getCollegeList = createAsyncThunk(
  "game/gettingCollegeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/game/colleges`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getHistoryList = createAsyncThunk(
  "game/getRandPlayerList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/history`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollegeList.pending, (state) => {
      state.isGettingCollegeList = true;
    });
    builder.addCase(getCollegeList.fulfilled, (state, { payload }) => {
      state.isGettingCollegeList = false;
      state.collegeList = payload.colleges
        .filter((item) => item !== "")
        .map((item) => ({
          name: item.college,
          status: [],
        }));
    });
    builder.addCase(getCollegeList.rejected, (state, { error }) => {
      state.isGettingCollegeList = false;
    });

    builder.addCase(getHistoryList.pending, (state) => {
      state.isGettingHistory = true;
    });
    builder.addCase(getHistoryList.fulfilled, (state, { payload }) => {
      state.isGettingHistory = false;
      state.history = {
        items: payload.data.map(
          (item: any) =>
            ({
              historyId: item.id,
              playerId: item.playerId,
              firstname: item.NBAPlayer.firstName,
              lastname: item.NBAPlayer.lastName,
              timestamp: item.timestamp,
              wrongStatus: [],
              rightStatus: "none",
            } as PlayerInfo)
        ),
        startTimestamp: payload.timestamp,
      };
    });
    builder.addCase(getHistoryList.rejected, (state, { error }) => {
      state.isGettingHistory = false;
    });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
