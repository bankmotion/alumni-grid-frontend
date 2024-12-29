import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { AllPlayer, PlayerOption } from "../../models/interface";
import { AppDispatch, RootState } from "../../app/store";

interface NBAPlayerTableContainerProps {
  allPlayerList: AllPlayer[];
  viewedPlayers: AllPlayer[];
  savedOption: PlayerOption[];
}

const NBAPlayerTableContainer: React.FC<NBAPlayerTableContainerProps> = ({
  allPlayerList,
  viewedPlayers,
  savedOption,
}) => {
  console.log("");
  const { classes } = useStyles();

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idFilter, setIdFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [draftYearFilter, setDraftYearFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [viewMode, setViewMode] = useState<"filtered" | "viewed">("filtered");

  const filterPlayers = (playerList: AllPlayer[]) => {
    return playerList.filter((player) => {
      return (
        (idFilter === "" || player.id.toString().includes(idFilter)) &&
        (firstNameFilter === "" ||
          player.firstName
            .toLowerCase()
            .includes(firstNameFilter.toLowerCase())) &&
        (lastNameFilter === "" ||
          player.lastName
            .toLowerCase()
            .includes(lastNameFilter.toLowerCase())) &&
        (positionFilter === "" ||
          player.position
            .toLowerCase()
            .includes(positionFilter.toLowerCase())) &&
        (draftYearFilter === "" ||
          player.draftYear.toString().includes(draftYearFilter))
      );
    });
  };

  const viewFilteredPlayers = filterPlayers(viewedPlayers);

  const filteredPlayers =
    statusFilter === "All"
      ? filterPlayers(allPlayerList)
      : statusFilter === "Active"
      ? filterPlayers(
          allPlayerList.filter((player) =>
            savedOption.some(
              (option) =>
                option.position === player.position &&
                option.draft === player.draftYear &&
                option.country.toLowerCase() === player.country.toLowerCase()
            )
          )
        )
      : filterPlayers(
          allPlayerList.filter(
            (player) => !savedOption.some((option) => option.id === player.id)
          )
        );

  useEffect(() => {
    if (viewedPlayers.length > 0) {
      setViewMode("viewed");
    } else {
      setViewMode("filtered");
    }
  }, [viewedPlayers]);

  useEffect(() => {
    if (statusFilter === "All") {
      setViewMode("filtered");
    }
  }, [statusFilter]);

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
        {/* <ButtonGroup variant="contained" style={{ marginTop: "20px" }}>
          <Button
            variant={statusFilter === "All" ? "contained" : "outlined"}
            color={viewMode === "viewed" ? "inherit" : "primary"}
            onClick={() => setStatusFilter("All")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "Active" ? "contained" : "outlined"}
            color={viewMode === "viewed" ? "inherit" : "primary"}
            onClick={() => setStatusFilter("Active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "Inactive" ? "contained" : "outlined"}
            color={viewMode === "viewed" ? "inherit" : "primary"}
            onClick={() => setStatusFilter("Inactive")}
          >
            Inactive
          </Button>
        </ButtonGroup> */}
        <Table sx={{ marginTop: "48px" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Draft Year</TableCell>
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
                  placeholder="Draft Year"
                  onChange={(e) => setDraftYearFilter(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewMode === "viewed"
              ? viewFilteredPlayers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.id}</TableCell>
                      <TableCell>{player.firstName}</TableCell>
                      <TableCell>{player.lastName}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.draftYear}</TableCell>
                    </TableRow>
                  ))
              : filteredPlayers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.id}</TableCell>
                      <TableCell>{player.firstName}</TableCell>
                      <TableCell>{player.lastName}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.draftYear}</TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
        <Box className={classes.pagination}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              viewMode === "viewed"
                ? viewFilteredPlayers.length
                : filteredPlayers.length
            }
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

export default NBAPlayerTableContainer;
