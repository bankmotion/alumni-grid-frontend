import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  getNFLAllPlayers,
  saveNFLPlayerOptions,
  getNFLPlayerOptions,
} from "../../reducers/game.slice";

import useStyles from "./styles";

import { AppDispatch, RootState } from "../../app/store";
import NFLConfirmationModal from "../../components/NFLConfirmationModal/NFLConfirmationModal";
import NFLOptionTableContainer from "../../components/NFLOptionTableContainer/NFLOptionTableContainer";
import NFLPlayerTableContainer from "../../components/NFLPlayerTableContainer/NFLPlayerTableContainer";
import { NFLPlayerOption } from "../../models/interface";
import { NFLPositions } from "../../config/config";

const AdminBoardNFL = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { isSavingOptions, saveOptions } = useSelector(
    (state: RootState) => state.game
  );
  const { NFLAllPlayerList, NFLOptionList } = useSelector(
    (state: RootState) => state.game
  );

  const [experience, setExperience] = useState<string>("");
  const [ageFrom, setAgeFrom] = useState<number>(0);
  const [ageTo, setAgeTo] = useState<number>(0);
  const [position, setPosition] = useState<string>("");

  const [toggleState, setToggleState] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [optionedPlayersCount, setOptionedPlayersCount] = useState(0);

  const [filteredPlayers, setFilteredPlayers] = useState(NFLAllPlayerList);

  // const [savedOptions, setSavedOptions] = useState<PlayerOption[]>([]);

  const handleFilterPlayers = () => {
    dispatch(
      saveNFLPlayerOptions({
        position: position,
        experience: experience,
        ageFrom: ageFrom,
        ageTo: ageTo,
      })
    ).then(() => {
      dispatch(getNFLPlayerOptions());
    });

    setDialogOpen(false);
    //dispatch(getPlayerOptions());
  };

  useEffect(() => {
    dispatch(getNFLPlayerOptions());
  }, [dispatch]);

  const handleSaveOption = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getNFLAllPlayers());
  }, []);

  return (
    <Paper className={classes.adminBoard}>
      <Box className={classes.headerContainer}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.title}
        >
          Admin Board (NFL)
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
        {/* Age Input */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Age(From)
          </Typography>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={ageFrom}
            onChange={(e) => setAgeFrom(Number(e.target.value))}
            inputProps={{ min: 18, max: 50 }} // Age range validation
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Age(To)
          </Typography>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={ageTo}
            onChange={(e) => setAgeTo(Number(e.target.value))}
            inputProps={{ min: 18, max: 50 }} // Age range validation
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Experience Input */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Experience (more)
          </Typography>
          <TextField
            fullWidth
            label="Experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            inputProps={{ min: 0, max: 30 }} // Experience range validation
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Position Dropdown */}
        <Grid item xs={12} md={3}>
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
              {Object.keys(NFLPositions).map((key) => {
                const positionValue =
                  NFLPositions[key as keyof typeof NFLPositions];
                return (
                  <MenuItem key={key} value={positionValue}>
                    {positionValue} {/* Display position name */}
                  </MenuItem>
                );
              })}
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

        <NFLOptionTableContainer
          savedOptions={NFLOptionList}
          //onViewFilteredPlayers={handleViewFilteredPlayers}
        />
      </Box>

      <NFLPlayerTableContainer NFLAllPlayerList={NFLAllPlayerList} />

      <NFLConfirmationModal
        open={dialogOpen}
        optionedPlayersCount={optionedPlayersCount}
        onConfirm={handleFilterPlayers}
        onCancel={handleDialogClose}
      />
    </Paper>
  );
};

export default AdminBoardNFL;
