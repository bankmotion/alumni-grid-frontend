import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
  Box,
  TextField,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material";
import { Tooltip } from "@mui/material";
import useStyles from "./styles";

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  experience: number;
  age: number;
  isActive: boolean;
}

const AdminBoardNFL = () => {
  const { classes } = useStyles();

  const [experience, setExperience] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [position, setPosition] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [toggleState, setToggleState] = useState<boolean>(false);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      firstName: "LeBron",
      lastName: "James",
      position: "SF",
      experience: 19, // Add experience
      age: 38, // Add age
      isActive: true,
    },
    {
      id: 2,
      firstName: "Kevin",
      lastName: "Durant",
      position: "PF",
      experience: 15,
      age: 34,
      isActive: true,
    },
    {
      id: 3,
      firstName: "Stephen",
      lastName: "Curry",
      position: "PG",
      experience: 14,
      age: 35,
      isActive: false,
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idFilter, setIdFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const searchedPlayers = players.filter((player) => {
    return (
      (idFilter === "" || player.id.toString().includes(idFilter)) &&
      (firstNameFilter === "" ||
        player.firstName
          .toLowerCase()
          .includes(firstNameFilter.toLowerCase())) &&
      (lastNameFilter === "" ||
        player.lastName.toLowerCase().includes(lastNameFilter.toLowerCase())) &&
      (positionFilter === "" ||
        player.position.toLowerCase().includes(positionFilter.toLowerCase())) &&
      (experienceFilter === "" ||
        player.experience?.toString().includes(experienceFilter)) &&
      (ageFilter === "" || player.age?.toString().includes(ageFilter))
    );
  });

  const handleFilterPlayers = () => {
    console.log("Filtering players with:", {
      experience,
      age,
      position,
      statusFilter,
    });
  };

  const handleSave = () => {
    console.log("Saving data...");
  };

  const filteredPlayers = players.filter((player) => {
    if (statusFilter === "Active") return player.isActive;
    if (statusFilter === "Inactive") return !player.isActive;
    return true;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Age
          </Typography>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            inputProps={{ min: 18, max: 50 }} // Age range validation
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Experience Input */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 600, marginBottom: "8px" }}
          >
            Experience (Years)
          </Typography>
          <TextField
            fullWidth
            label="Experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            inputProps={{ min: 0, max: 30 }} // Experience range validation
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
              <MenuItem value="PG">Point Guard</MenuItem>
              <MenuItem value="SG">Shooting Guard</MenuItem>
              <MenuItem value="SF">Small Forward</MenuItem>
              <MenuItem value="PF">Power Forward</MenuItem>
              <MenuItem value="C">Center</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Filter Players Button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFilterPlayers}
        >
          Filter Players
        </Button>
      </Box>

      {/* Status Filter Buttons */}
      <ButtonGroup variant="contained" style={{ marginTop: "20px" }}>
        <Button
          variant={statusFilter === "All" ? "contained" : "outlined"}
          onClick={() => setStatusFilter("All")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "Active" ? "contained" : "outlined"}
          onClick={() => setStatusFilter("Active")}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === "Inactive" ? "contained" : "outlined"}
          onClick={() => setStatusFilter("Inactive")}
        >
          Inactive
        </Button>
      </ButtonGroup>

      {/* Player Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="ID"
                  onChange={(e) => setIdFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="First Name"
                  onChange={(e) => setFirstNameFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Last Name"
                  onChange={(e) => setLastNameFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Position"
                  onChange={(e) => setPositionFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Experience"
                  onChange={(e) => setExperienceFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Age"
                  onChange={(e) => setAgeFilter(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlayers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.firstName}</TableCell>
                  <TableCell>{player.lastName}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.experience}</TableCell>
                  <TableCell>{player.age}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPlayers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Save Button */}
      <Box mt={2} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminBoardNFL;
