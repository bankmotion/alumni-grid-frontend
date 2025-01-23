import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import {
  getNFLAllPlayers,
  getPlayerOptions,
  savePlayerOptions,
} from "../../reducers/game.slice";
import Toastify from "toastify-js";

import useStyles from "./styles";

import { RootState } from "../../app/store";
import NFLConfirmationModal from "../../components/NFLConfirmationModal/NFLConfirmationModal";
import NFLOptionTableContainer from "../../components/NFLOptionTableContainer/NFLOptionTableContainer";
import NFLPlayerTableContainer from "../../components/NFLPlayerTableContainer/NFLPlayerTableContainer";
import { NFLPositions } from "../../config/config";
import { ActiveStatus, PlayType } from "../../constant/const";
import { useAppDispatch } from "../../app/hooks";
import { NFLAllPlayer, PlayerOption } from "../../models/interface";

const AdminBoardNFL = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const { isSavingOptions } = useSelector((state: RootState) => state.game);
  const { NFLAllPlayerList, optionList } = useSelector(
    (state: RootState) => state.game
  );

  const [experience, setExperience] = useState<string>("");
  const [ageFrom, setAgeFrom] = useState<number>(0);
  const [ageTo, setAgeTo] = useState<number>(0);
  const [position, setPosition] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [optionedPlayersCount, setOptionedPlayersCount] = useState(0);

  const [filteredPlayers, setFilteredPlayers] = useState(NFLAllPlayerList);
  const [activeViewId, setActiveViewId] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Selected" | "Deselected" | "None"
  >("All");

  const handleFilterPlayers = () => {
    dispatch(
      savePlayerOptions({
        filters: {
          position: position,
          experience: experience,
          ageFrom: ageFrom,
          ageTo: ageTo,
        },
        playType: PlayType.NFL,
      })
    ).then(() => {
      dispatch(getPlayerOptions({ playType: PlayType.NFL }));
    });

    setDialogOpen(false);
  };

  const isMatchForPlayerOption = (
    player: NFLAllPlayer,
    option: PlayerOption
  ) => {
    const positionMatch =
      option.position === "-1" || player.position === option.position;
    const experienceMatch = player.experience >= option.experience;
    const ageFromMatch = player.age >= option.ageFrom;
    const ageToMatch = player.age <= option.ageTo;

    return positionMatch && experienceMatch && ageFromMatch && ageToMatch;
  };

  const handleViewFilteredPlayers = (option: PlayerOption) => {
    const filtered = NFLAllPlayerList.filter((player) =>
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

    if (statusFilter === "All") setFilteredPlayers(NFLAllPlayerList);

    if (statusFilter === "Active") {
      setFilteredPlayers(
        NFLAllPlayerList.filter(
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
        NFLAllPlayerList.filter(
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
        NFLAllPlayerList.filter(
          (player) => player.active === ActiveStatus.Actived
        )
      );
    }

    if (statusFilter === "Deselected") {
      setFilteredPlayers(
        NFLAllPlayerList.filter(
          (player) => player.active === ActiveStatus.Inactived
        )
      );
    }
  }, [statusFilter, NFLAllPlayerList, optionList]);

  useEffect(() => {
    setOptionedPlayersCount(
      NFLAllPlayerList.filter((player) =>
        isMatchForPlayerOption(player, {
          experience,
          ageFrom,
          ageTo,
          position,
        } as PlayerOption)
      ).length
    );
  }, [experience, ageFrom, ageTo, position, NFLAllPlayerList]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter, activeViewId]);

  useEffect(() => {
    dispatch(getPlayerOptions({ playType: PlayType.NFL }));
  }, [dispatch]);

  const handleSaveOption = () => {
    if (!position || experience === "" || !ageFrom || !ageTo) {
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

  useEffect(() => {
    dispatch(getNFLAllPlayers());
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
          Admin Board (NFL)
        </Typography>
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
          Actived
        </Button>
        <Button
          variant={statusFilter === "Inactive" ? "contained" : "outlined"}
          color={statusFilter === "Inactive" ? "primary" : "inherit"}
          onClick={() => {
            setStatusFilter("Inactive");
            setActiveViewId(null);
          }}
        >
          Inactived
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

      <NFLPlayerTableContainer
        viewedPlayers={filteredPlayers}
        page={page}
        setPage={setPage}
      />

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
