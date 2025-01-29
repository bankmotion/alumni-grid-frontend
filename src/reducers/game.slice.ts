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
} from "../models/interface";
import { ActiveStatus, Difficulty, PlayType } from "../constant/const";

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

  isUpdateActiveStatus: false,
};

export const getCollegeList = createAsyncThunk(
  "game/gettingCollegeList",
  async ({ playType }: { playType: PlayType }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/game/colleges/${playType}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getHistoryList = createAsyncThunk(
  "game/getRandPlayerList",
  async (
    { timestamp, playType }: { timestamp: number; playType: PlayType },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/history/timestamp/${playType}/${timestamp}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLeaderHistory = createAsyncThunk(
  "leaderboard/getAllLeaderHistory",
  async ({ playType }: { playType: PlayType }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/history/all/${playType}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const savePlayerOptions = createAsyncThunk(
  "game/savePlayerOptions",
  async (
    {
      filters,
      playType,
    }: {
      filters: {
        position?: string;
        country?: string;
        draft?: number;
        experience?: string;
        ageFrom?: number;
        ageTo?: number;
      };
      playType: PlayType;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/admin/${playType}`,
        filters
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPlayerOptions = createAsyncThunk(
  "game/getOptionList",
  async ({ playType }: { playType: PlayType }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/admin/${playType}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNBAAllPlayers = createAsyncThunk(
  "game/getNBAAllPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/game/all/${PlayType.NBA}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNFLAllPlayers = createAsyncThunk(
  "game/getNFLAllPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/game/all/${PlayType.NFL}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePlayerOption = createAsyncThunk(
  "game/NBAdeletePlayerOption",
  async ({ id, type }: { id: number; type: PlayType }, { rejectWithValue }) => {
    try {
      await axios.delete(`${SERVER_URL}/admin/${id}/${type}`);
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

export const handleSaveDifficultyAction = createAsyncThunk(
  "game/saveDifficultyAction",
  async (
    {
      difficulty,
      ids,
      playType,
    }: {
      difficulty: Difficulty;
      ids: number[];
      playType: PlayType;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`${SERVER_URL}/admin/difficulty/${playType}`, {
        ids,
        difficulty,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setHistory: (state) => {
      state.history = {
        items: [],
        startTimestamp: 0,
      };
    },

    updateAllPlayerList: (state, { payload }) => {
      const { id, checkStatus } = payload;
      const playerIndex = state.allPlayerList.findIndex(
        (player) => player.id === id
      );

      if (playerIndex !== -1) {
        state.allPlayerList[playerIndex].checkStatus = checkStatus;
      }
    },

    updateNFLAllPlayerList: (state, { payload }) => {
      const { id, checkStatus } = payload;
      const playerIndex = state.NFLAllPlayerList.findIndex(
        (player) => player.id === id
      );

      if (playerIndex !== -1) {
        state.NFLAllPlayerList[playerIndex].checkStatus = checkStatus;
      }
    },
  },
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
              firstname: item.NBAPlayer?.firstName || item.NFLPlayer?.firstName,
              lastname: item.NBAPlayer?.lastName || item.NFLPlayer?.lastName,
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

    builder.addCase(getNBAAllPlayers.pending, (state) => {
      state.isFetchingPlayers = true;
      state.allPlayerList = [];
    });
    builder.addCase(getNBAAllPlayers.fulfilled, (state, { payload }) => {
      state.isFetchingPlayers = false;
      state.allPlayerList = payload.data;
    });
    builder.addCase(getNBAAllPlayers.rejected, (state, { payload }) => {
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
      })
      .addCase(savePlayerOptions.rejected, (state, { payload }) => {
        state.isSavingOptions = false;
        state.saveOptions = payload as string;
      });

    builder.addCase(getPlayerOptions.pending, (state) => {
      state.optionList = [];
    });
    builder.addCase(getPlayerOptions.fulfilled, (state, { payload }) => {
      state.optionList = payload.data.map((item: any) => {
        const jsondata = JSON.parse(item.setting);
        return {
          id: item?.id,
          position: jsondata?.position,
          country: jsondata?.country,
          draft: jsondata?.draft,
          college: jsondata?.college,
          experience: Number(jsondata?.experience) || 0,
          ageTo: jsondata?.ageTo,
          ageFrom: jsondata?.ageFrom,
        };
      });
    });
    builder.addCase(getPlayerOptions.rejected, (state, { payload }) => {
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

    builder.addCase(handleSaveDifficultyAction.pending, (state) => {});
    builder.addCase(
      handleSaveDifficultyAction.fulfilled,
      (state, { payload }) => {}
    );
    builder.addCase(handleSaveDifficultyAction.rejected, (state) => {});
  },
});

export const { setHistory, updateAllPlayerList, updateNFLAllPlayerList } =
  gameSlice.actions;

export default gameSlice.reducer;
