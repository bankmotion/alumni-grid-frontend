import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  CircularProgress,
  ButtonGroup,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import {
  savePlayerOptions,
  getPlayerOptions,
  getNBAAllPlayers,
} from "../../reducers/game.slice";

import useStyles from "./styles";
import NBAConfirmationModal from "../../components/NBAConfirmationModal/NBAConfirmationModal";
import { RootState } from "../../app/store";
import NBAPlayerTableContainer from "../../components/NBAPlayerTableContainer/NBAPlayerTableContainer";
import NBAOptionTableContainer from "../../components/NBAOptionTableContainer/NBAOptionTableContainer";
import { AllPlayer, PlayerOption } from "../../models/interface";
import { ActiveStatus, PlayType } from "../../constant/const";
import { useAppDispatch } from "../../app/hooks";

const AdminBoardNBA = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const { isSavingOptions } = useSelector((state: RootState) => state.game);
  const { allPlayerList, optionList } = useSelector(
    (state: RootState) => state.game
  );

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [draftYear, setDraftYear] = useState<number>(1900);
  const [position, setPosition] = useState<string>("");
  const [page, setPage] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [optionedPlayersCount, setOptionedPlayersCount] = useState(0);

  const [filteredPlayers, setFilteredPlayers] = useState(allPlayerList);
  const [activeViewId, setActiveViewId] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Selected" | "Deselected" | "None"
  >("All");

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  const handleFilterPlayers = () => {
    dispatch(
      savePlayerOptions({
        filters: {
          position: position ? position : "-1",
          country: selectedCountry ? selectedCountry : "-1",
          draft: draftYear,
        },
        playType: PlayType.NBA,
      })
    ).then(() => {
      dispatch(getPlayerOptions({ playType: PlayType.NBA }));
    });

    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getPlayerOptions({ playType: PlayType.NBA }));
  }, [dispatch]);

  const handleSaveOption = () => {
    if (!position || !selectedCountry || !draftYear) {
      Toastify({
        text: "Please select all options!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
      return;
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const isMatchForPlayerOption = (player: AllPlayer, option: PlayerOption) => {
    const positionMatch =
      option.position === "-1" || player.position === option.position;

    const countryMatch =
      option.country === "-1" || player.country === option.country;
    const draftMatch = option.draft === -1 || player.draftYear >= option.draft;

    return positionMatch && countryMatch && draftMatch;
  };

  const handleViewFilteredPlayers = (option: PlayerOption) => {
    const filtered = allPlayerList.filter((player) =>
      isMatchForPlayerOption(player, option)
    );

    if (filtered.length === 0) {
      Toastify({
        text: "No data matches the selected options!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    }

    setFilteredPlayers(filtered);
  };

  useEffect(() => {
    if (statusFilter === "None") return;

    if (statusFilter === "All") setFilteredPlayers(allPlayerList);

    if (statusFilter === "Active") {
      setFilteredPlayers(
        allPlayerList.filter(
          (player) =>
            (optionList.some((option) =>
              isMatchForPlayerOption(player, option)
            ) &&
              player.active !== ActiveStatus.Inactived) ||
            player.active === ActiveStatus.Actived
        )
      );
    }

    if (statusFilter === "Inactive") {
      setFilteredPlayers(
        allPlayerList.filter(
          (player) =>
            (optionList.every(
              (option) => !isMatchForPlayerOption(player, option)
            ) &&
              player.active !== ActiveStatus.Actived) ||
            player.active === ActiveStatus.Inactived
        )
      );
    }

    if (statusFilter === "Selected") {
      setFilteredPlayers(
        allPlayerList.filter((player) => player.active === ActiveStatus.Actived)
      );
    }

    if (statusFilter === "Deselected") {
      setFilteredPlayers(
        allPlayerList.filter(
          (player) => player.active === ActiveStatus.Inactived
        )
      );
    }
  }, [statusFilter, allPlayerList, optionList]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter, activeViewId]);

  useEffect(() => {
    setOptionedPlayersCount(
      allPlayerList.filter((player) =>
        isMatchForPlayerOption(player, {
          country: selectedCountry,
          draft: draftYear,
          position,
        } as PlayerOption)
      ).length
    );
  }, [selectedCountry, draftYear, position, allPlayerList]);

  useEffect(() => {
    dispatch(getNBAAllPlayers());
  }, [dispatch]);

  return (
    <Paper className={classes.adminBoard}>
      <Box className={classes.headerContainer}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.title}
        >
          Admin Board (NBA)
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        style={{ marginTop: "16px", alignItems: "center" }}
      >
        {/* Country Dropdown */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Country
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              label="Country"
            >
              <MenuItem value="-1">USA & Canada</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Draft Year Input */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Draft Year(From)
          </Typography>
          <TextField
            fullWidth
            label="Draft Year"
            type="number"
            value={draftYear}
            onChange={(e) => setDraftYear(Number(e.target.value))}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Position Dropdown */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Position
          </Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Position</InputLabel>
            <Select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              label="Position"
            >
              <MenuItem value="-1">All</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="CF">C-F</MenuItem>
              <MenuItem value="F">F</MenuItem>
              <MenuItem value="FC">F-C</MenuItem>
              <MenuItem value="FG">F-G</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="GF">G-F</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveOption}
          disabled={isSavingOptions}
        >
          {isSavingOptions ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Save options"
          )}
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Saved Options
        </Typography>

        <NBAOptionTableContainer
          savedOptions={optionList}
          onViewFilteredPlayers={handleViewFilteredPlayers}
          setStatusFilter={setStatusFilter}
          activeViewId={activeViewId}
          setActiveViewId={setActiveViewId}
        />
      </Box>

      <ButtonGroup variant="contained" style={{ marginTop: "20px" }}>
        <Button
          variant={statusFilter === "All" ? "contained" : "outlined"}
          color={statusFilter === "All" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("All");
            setActiveViewId(null);
          }}
        >
          All Players
        </Button>
        <Button
          variant={statusFilter === "Active" ? "contained" : "outlined"}
          color={statusFilter === "Active" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("Active");
            setActiveViewId(null);
          }}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === "Inactive" ? "contained" : "outlined"}
          color={statusFilter === "Inactive" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("Inactive");
            setActiveViewId(null);
          }}
        >
          Inactive
        </Button>
        <Button
          variant={statusFilter === "Selected" ? "contained" : "outlined"}
          color={statusFilter === "Selected" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("Selected");
            setActiveViewId(null);
          }}
        >
          Selected
        </Button>
        <Button
          variant={statusFilter === "Deselected" ? "contained" : "outlined"}
          color={statusFilter === "Deselected" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("Deselected");
            setActiveViewId(null);
          }}
        >
          Deselected
        </Button>
      </ButtonGroup>

      <NBAPlayerTableContainer
        viewedPlayers={filteredPlayers}
        page={page}
        setPage={setPage}
      />

      <NBAConfirmationModal
        open={dialogOpen}
        optionedPlayersCount={optionedPlayersCount}
        onConfirm={handleFilterPlayers}
        onCancel={handleDialogClose}
      />
    </Paper>
  );
};

export default AdminBoardNBA;
