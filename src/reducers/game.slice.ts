import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config/config";
import { College, PlayerInfo } from "../models/interface";
import { PlayType } from "../constant/const";

export interface GameState {
  collegeList: College[];
  isGettingCollegeList: boolean;
  playerList: {
    items: PlayerInfo[];
    startTimestamp: number;
  };
  isGettingPlayerList: boolean;
}

const initialState: GameState = {
  collegeList: [],
  isGettingCollegeList: false,
  playerList: {
    items: [],
    startTimestamp: 0,
  },
  isGettingPlayerList: false,
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

// export const getRandPlayerList = createAsyncThunk(
//   "game/getRandPlayerList",
//   async ({ playType }: { playType: PlayType }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${SERVER_URL}/game/randplayer/${playType}`
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

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

// export const gameSlice = createSlice({
//   name: "game",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getCollegeList.pending, (state) => {
//       state.isGettingCollegeList = true;
//     });
//     builder.addCase(getCollegeList.fulfilled, (state, { payload }) => {
//       state.isGettingCollegeList = false;
//       state.collegeList = payload.colleges
//         .filter((item) => item !== "")
//         .map((item) => ({
//           name: item.college,
//           status: [],
//         }));
//     });
//     builder.addCase(getCollegeList.rejected, (state, { error }) => {
//       state.isGettingCollegeList = false;
//     });

//     builder.addCase(getRandPlayerList.pending, (state) => {
//       state.isGettingPlayerList = true;
//     });
//     builder.addCase(getRandPlayerList.fulfilled, (state, { payload }) => {
//       state.isGettingPlayerList = false;
//       state.playerList = payload.data.map((item) => ({
//         id: item.id,
//         firstname: item.firstName,
//         lastname: item.lastName,
//         wrongStatus: [],
//         rightStatus: "none",
//       }));
//     });
//     builder.addCase(getRandPlayerList.rejected, (state, { error }) => {
//       state.isGettingPlayerList = false;
//     });
//   },
// });

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
      state.isGettingPlayerList = true;
    });
    builder.addCase(getHistoryList.fulfilled, (state, { payload }) => {
      state.isGettingPlayerList = false;
      console.log("=========payload========", payload);
      state.playerList = {
        items: payload.data.map((item) => ({
          id: item.id,
          playerid: item.playerId,
          firstname: item.NBAPlayer.firstName,
          lastname: item.NBAPlayer.lastName,
          wrongStatus: [],
          rightStatus: "none",
        })),
        startTimestamp: payload.timestamp,
      };
    });
    builder.addCase(getHistoryList.rejected, (state, { error }) => {
      state.isGettingPlayerList = false;
    });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
