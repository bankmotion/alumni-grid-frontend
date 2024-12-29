import { useState } from "react";
import {
  Paper,
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  TableContainer,
} from "@mui/material";
import useStyles from "./styles";
import { NFLAllPlayer } from "../../models/interface";

interface NFLPlayerTableContainerProps {
  NFLAllPlayerList: NFLAllPlayer[]; // Expect an array of AllPlayer type
}

const NFLPlayerTableContainer: React.FC<NFLPlayerTableContainerProps> = ({
  NFLAllPlayerList,
}) => {
  console.log("");
  const { classes } = useStyles();

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idFilter, setIdFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  //   const filteredPlayers = players.filter((player) => {
  //     if (statusFilter === "Active") return player.isActive;
  //     if (statusFilter === "Inactive") return !player.isActive;
  //     return true;
  //   });

  const searchedPlayers = NFLAllPlayerList.filter((player) => {
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
      (ageFilter === "" || player.age.toString().includes(ageFilter)) &&
      (experienceFilter === "" ||
        player.experience
          .toLowerCase()
          .includes(experienceFilter.toLowerCase()))
    );
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
    <Box>
      <TableContainer className={classes.tableContainer}>
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
            {searchedPlayers
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
        <Box className={classes.pagination}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={NFLAllPlayerList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default NFLPlayerTableContainer;
