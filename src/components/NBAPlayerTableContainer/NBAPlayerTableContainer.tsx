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
  Button,
  Checkbox,
} from "@mui/material";
import useStyles from "./styles";
import { AllPlayer } from "../../models/interface";
import { ActiveStatus, DifficultyName, PlayType } from "../../constant/const";
import { useAppDispatch } from "../../app/hooks";
import {
  getNBAAllPlayers,
  updateActiveStatus,
  updateAllPlayerList,
} from "../../reducers/game.slice";

interface NBAPlayerTableContainerProps {
  viewedPlayers: AllPlayer[];
  page: number;
  setPage: (page: number) => void;
}

const NBAPlayerTableContainer: React.FC<NBAPlayerTableContainerProps> = ({
  viewedPlayers,
  page,
  setPage,
}) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [idFilter, setIdFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [draftYearFilter, setDraftYearFilter] = useState("");
  const [viewFilteredPlayers, setViewFilteredPlayers] = useState([]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateActive = (id: number, active: ActiveStatus) => {
    dispatch(updateActiveStatus({ type: PlayType.NBA, id, active }))
      .unwrap()
      .then(() => {
        dispatch(getNBAAllPlayers());
      });
  };

  const handleChangeCheckBox = (id: number, checkStatus: boolean) => {
    dispatch(updateAllPlayerList({ id, checkStatus }));
  };

  const renderButtonGroup = (player: AllPlayer) => {
    return player.active === ActiveStatus.Actived ? (
      <>
        <Button
          variant={"contained"}
          color={"info"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Inactived)}
        >
          Deselect
        </Button>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Canceled)}
        >
          Cancel
        </Button>
      </>
    ) : player.active === ActiveStatus.Inactived ? (
      <>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Actived)}
        >
          Select
        </Button>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Canceled)}
        >
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Actived)}
        >
          Select
        </Button>
        <Button
          variant={"contained"}
          color={"info"}
          onClick={() => handleUpdateActive(player.id, ActiveStatus.Inactived)}
        >
          Deselect
        </Button>
      </>
    );
  };

  useEffect(() => {
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
            player?.college
              ?.toLowerCase()
              ?.includes(collegeFilter.toLowerCase()))
        );
      });
    };

    const viewFilteredPlayers = filterPlayers(viewedPlayers);
    setViewFilteredPlayers(viewFilteredPlayers);
  }, [
    viewedPlayers,
    collegeFilter,
    draftYearFilter,
    firstNameFilter,
    lastNameFilter,
    idFilter,
    positionFilter,
  ]);

  return (
    <Box>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Draft Year</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
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
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewFilteredPlayers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <Checkbox
                      value={true}
                      {...label}
                      checked={player.checkStatus}
                      onChange={(e) =>
                        handleChangeCheckBox(player.id, e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.firstName}</TableCell>
                  <TableCell>{player.lastName}</TableCell>
                  <TableCell>{player.college}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.draftYear}</TableCell>
                  <TableCell>{DifficultyName[player.difficulty]}</TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    {renderButtonGroup(player)}
                  </TableCell>
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
