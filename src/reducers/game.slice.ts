import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config/config";
import {
  AllHistory,
  College,
  PlayerInfo,
  AllPlayer,
  PlayerOption,
  NFLAllPlayer,
  NFLPlayerOption,
} from "../models/interface";
import { json } from "stream/consumers";
import { ActiveStatus, PlayType } from "../constant/const";

export interface GameState {
  collegeList: College[];
  isGettingCollegeList: boolean;
  history: {
    items: PlayerInfo[];
    startTimestamp: number;
  };
  isGettingHistory: boolean;

  allLeaderHistory: AllHistory[];
  isGettingAllLeaderHistory: boolean;

  isSavingOptions: boolean;
  saveOptions: string;

  allPlayerList: AllPlayer[];
  isFetchingPlayers: boolean;
  errorFetchingPlayers: string | null;

  NFLAllPlayerList: NFLAllPlayer[];
  isNFLFetchingPlayers: boolean;
  errorNFLFetchingPlayers: string | null;

  optionList: PlayerOption[];

  NFLOptionList: NFLPlayerOption[];
  isUpdateActiveStatus: boolean;
}

const initialState: GameState = {
  collegeList: [],
  isGettingCollegeList: false,
  history: {
    items: [],
    startTimestamp: 0,
  },
  isGettingHistory: false,

  allLeaderHistory: [],
  isGettingAllLeaderHistory: false,

  isSavingOptions: false,
  saveOptions: null,

  allPlayerList: [],
  isFetchingPlayers: false,
  errorFetchingPlayers: null,

  NFLAllPlayerList: [],
  isNFLFetchingPlayers: false,
  errorNFLFetchingPlayers: null,

  optionList: [],

  NFLOptionList: [],
  isUpdateActiveStatus: false,
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
  async (timeStamp: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/history/timestamp/${timeStamp}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLeaderHistory = createAsyncThunk(
  "leaderboard/getAllLeaderHistory",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/history/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const savePlayerOptions = createAsyncThunk(
  "game/savePlayerOptions",
  async (
    filters: {
      position: string;
      country: string;
      draft: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${SERVER_URL}/admin/0`, filters);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveNFLPlayerOptions = createAsyncThunk(
  "game/saveNFLPlayerOptions",
  async (
    filters: {
      position: string;
      experience: string;
      ageFrom: number;
      ageTo: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${SERVER_URL}/admin/1`, filters);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPlayerOptions = createAsyncThunk(
  "game/getNBAOptionList",
  async ({ playerType }: { playerType: PlayType }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/${playerType}`);
      return response.data; // Assuming your API response is an array of players
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNFLPlayerOptions = createAsyncThunk(
  "game/getNFLOptionList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/1`);
      return response.data; // Assuming your API response is an array of players
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllPlayers = createAsyncThunk(
  "game/getNBAAllPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/game/all/0`);
      return response.data; // Assuming your API response is an array of players
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNFLAllPlayers = createAsyncThunk(
  "game/getNFLAllPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/game/all/1`);
      return response.data; // Assuming your API response is an array of players
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePlayerOption = createAsyncThunk(
  "game/NBAdeletePlayerOption",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${SERVER_URL}/admin/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNFLPlayerOption = createAsyncThunk(
  "game/NFLdeletePlayerOption",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${SERVER_URL}/admin/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateActiveStatus = createAsyncThunk(
  "game/updateActiveStatus",
  async (
    { type, id, active }: { type: PlayType; id: number; active: ActiveStatus },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(`${SERVER_URL}/game/active/${type}`, {
        id,
        status: active,
      });
    } catch (error) {
      return rejectWithValue(error.message);
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

    builder.addCase(getLeaderHistory.pending, (state) => {
      state.isGettingAllLeaderHistory = true;
    });
    builder.addCase(getLeaderHistory.fulfilled, (state, { payload }) => {
      state.isGettingAllLeaderHistory = false;
      // state.allLeaderHistory = payload.data.map((historyItem: any) => ({
      //   players: historyItem.players.map((player: any) => ({
      //     id: player.id,
      //     firstName: player.firstName,
      //     lastName: player.lastName,
      //   })),
      //   timeStamp: historyItem.timestamp,
      // }));
      state.allLeaderHistory = payload.data.map(
        (historyItem: any) =>
          ({
            players: historyItem.players,
            timeStamp: historyItem.timestamp,
            correctCount: historyItem.correctCount,
            playingCount: historyItem.playingCount,
          } as AllHistory)
      );
    });
    builder.addCase(getLeaderHistory.rejected, (state, { error }) => {
      state.isGettingAllLeaderHistory = false;
    });

    builder.addCase(getAllPlayers.pending, (state) => {
      state.isFetchingPlayers = true;
      state.allPlayerList = [];
    });
    builder.addCase(getAllPlayers.fulfilled, (state, { payload }) => {
      state.isFetchingPlayers = false;
      state.allPlayerList = payload.data;
    });
    builder.addCase(getAllPlayers.rejected, (state, { payload }) => {
      state.isFetchingPlayers = false;
      state.errorFetchingPlayers = payload as string;
    });

    builder.addCase(getNFLAllPlayers.pending, (state) => {
      state.isNFLFetchingPlayers = true;
      state.NFLAllPlayerList = [];
    });
    builder.addCase(getNFLAllPlayers.fulfilled, (state, { payload }) => {
      state.isNFLFetchingPlayers = false;
      state.NFLAllPlayerList = payload.data;
    });
    builder.addCase(getNFLAllPlayers.rejected, (state, { payload }) => {
      state.isNFLFetchingPlayers = false;
      state.errorFetchingPlayers = payload as string;
    });

    builder
      .addCase(savePlayerOptions.pending, (state) => {
        state.isSavingOptions = true;
        state.saveOptions = null;
      })
      .addCase(savePlayerOptions.fulfilled, (state, { payload }) => {
        state.isSavingOptions = false;
        console.log(payload);
      })
      .addCase(savePlayerOptions.rejected, (state, { payload }) => {
        state.isSavingOptions = false;
        state.saveOptions = payload as string;
      });

    builder.addCase(getPlayerOptions.pending, (state) => {
      state.optionList = [];
    });
    builder.addCase(getPlayerOptions.fulfilled, (state, { payload }) => {
      state.optionList = payload.data.map((item) => {
        const jsondata = JSON.parse(item.setting);
        return {
          id: item.id,
          position: jsondata.position,
          country: jsondata.country,
          draft: jsondata.draft,
          college: jsondata.college,
        };
      });
    });
    builder.addCase(getPlayerOptions.rejected, (state, { payload }) => {
      console.error("Failed to get option:", payload);
    });

    builder.addCase(getNFLPlayerOptions.pending, (state) => {
      state.NFLOptionList = [];
    });
    builder.addCase(getNFLPlayerOptions.fulfilled, (state, { payload }) => {
      state.NFLOptionList = payload.data.map((item) => {
        const jsondata = JSON.parse(item.setting);
        return {
          id: item.id,
          position: jsondata.position,
          age: jsondata.age,
          experience: jsondata.experience,
        };
      });
    });
    builder.addCase(getNFLPlayerOptions.rejected, (state, { payload }) => {
      console.error("Failed to get option:", payload);
    });

    builder.addCase(deletePlayerOption.fulfilled, (state, { payload }) => {
      // state.savedOptions = state.savedOptions.filter(
      //   (option) => option.id !== payload
      // );
    });
    builder.addCase(deletePlayerOption.rejected, (state, { payload }) => {
      console.error("Failed to delete option:", payload);
    });

    builder.addCase(updateActiveStatus.pending, (state, { payload }) => {
      state.isUpdateActiveStatus = true;
    });
    builder.addCase(updateActiveStatus.fulfilled, (state, { payload }) => {
      state.isUpdateActiveStatus = false;
    });
    builder.addCase(updateActiveStatus.rejected, (state, { payload }) => {
      state.isUpdateActiveStatus = false;
    });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
