import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  IconButton,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material";
import { Tooltip } from "@mui/material";
import {
  getAllPlayers,
  savePlayerOptions,
  getPlayerOptions,
} from "../../reducers/game.slice";

import useStyles from "./styles";
import NBAConfirmationModal from "../../components/NBAConfirmationModal/NBAConfirmationModal";
import { AppDispatch, RootState } from "../../app/store";
import NBAPlayerTableContainer from "../../components/NBAPlayerTableContainer/NBAPlayerTableContainer";
import NBAOptionTableContainer from "../../components/NBAOptionTableContainer/NBAOptionTableContainer";
import { PlayerOption } from "../../models/interface";
import { PlayType } from "../../constant/const";

const AdminBoardNBA = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { isSavingOptions } = useSelector((state: RootState) => state.game);
  const { allPlayerList, optionList } = useSelector(
    (state: RootState) => state.game
  );
  console.log("allplayerlist", allPlayerList);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [draftYear, setDraftYear] = useState<number>(1900);
  const [position, setPosition] = useState<string>("");
  const [toggleState, setToggleState] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [optionedPlayersCount] = useState(0);

  const [filteredPlayers, setFilteredPlayers] = useState(allPlayerList);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  const handleFilterPlayers = () => {
    dispatch(
      savePlayerOptions({
        position: position ? position : "-1",
        country: selectedCountry ? selectedCountry : "-1",
        draft: draftYear,
      })
    ).then(() => {
      dispatch(getPlayerOptions({ playerType: PlayType.NBA }));
    });

    setDialogOpen(false);
    //dispatch(getPlayerOptions());
  };

  useEffect(() => {
    dispatch(getPlayerOptions({ playerType: PlayType.NBA }));
  }, [dispatch]);

  const handleSaveOption = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleViewFilteredPlayers = (option: PlayerOption) => {
    console.log("allplayerlist", allPlayerList);
    console.log("option", option);
    const filtered = allPlayerList.filter((player) => {
      const positionMatch =
        option.position === "-1" || player.position === option.position;

      const countryMatch =
        option.country === "-1" || player.country === option.country;
      const draftMatch =
        option.draft === -1 || player.draftYear >= option.draft;

      return positionMatch && countryMatch && draftMatch;
    });

    console.log(filtered.length);
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
    dispatch(getAllPlayers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPlayers(allPlayerList);
  }, [allPlayerList]);

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

        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip
            title={
              toggleState
                ? "The NBA data will be represented in the game."
                : "If this button is disabled, the NBA data will not be represented in the game."
            }
            arrow
          >
            <IconButton
              onClick={() => setToggleState(!toggleState)}
              aria-label="toggle"
              className={classes.toggleButton}
            >
              {toggleState ? (
                <CheckIcon color="primary" />
              ) : (
                <CloseIcon color="secondary" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
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
        />
      </Box>

      {/* <NBAPlayerTableContainer allPlayerList={allPlayerList} />
       */}

      <NBAPlayerTableContainer
        allPlayerList={allPlayerList}
        viewedPlayers={filteredPlayers}
        savedOption={optionList}
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
