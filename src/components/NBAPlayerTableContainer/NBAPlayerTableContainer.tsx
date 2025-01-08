import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  TableContainer,
  ButtonGroup,
  Button,
} from "@mui/material";
import useStyles from "./styles";
import { AllPlayer } from "../../models/interface";

interface NBAPlayerTableContainerProps {
  viewedPlayers: AllPlayer[];
}

const NBAPlayerTableContainer: React.FC<NBAPlayerTableContainerProps> = ({
  viewedPlayers,
}) => {
  const { classes } = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idFilter, setIdFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [draftYearFilter, setDraftYearFilter] = useState("");

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
          player?.draftYear?.toString()?.includes(draftYearFilter)) &&
        (collegeFilter === "" ||
          player?.college?.toLowerCase()?.includes(collegeFilter.toLowerCase()))
      );
    });
  };

  const viewFilteredPlayers = filterPlayers(viewedPlayers);

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>College</TableCell>
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
                  placeholder="College"
                  onChange={(e) => setCollegeFilter(e.target.value)}
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
            {viewFilteredPlayers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.firstName}</TableCell>
                  <TableCell>{player.lastName}</TableCell>
                  <TableCell>{player.college}</TableCell>
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
            count={viewFilteredPlayers.length}
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
