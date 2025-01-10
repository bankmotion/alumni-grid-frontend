import { useEffect } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { PlayerOption } from "../../models/interface";
import { deletePlayerOption } from "../../reducers/game.slice";
import { getPlayerOptions } from "../../reducers/game.slice";
import { PlayType } from "../../constant/const";
import { useAppDispatch } from "../../app/hooks";

interface NBAPlayerTableContainerProps {
  savedOptions: PlayerOption[];
  onViewFilteredPlayers: (option: PlayerOption) => void;
  setStatusFilter: (
    statusFilter: "All" | "Active" | "Inactive" | "None"
  ) => void;
  activeViewId: number | null;
  setActiveViewId: (activeViewId: number | null) => void;
}

const NBAOptionTableContainer: React.FC<NBAPlayerTableContainerProps> = ({
  savedOptions,
  onViewFilteredPlayers,
  setStatusFilter,
  activeViewId,
  setActiveViewId,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteOption = (id: number) => {
    dispatch(deletePlayerOption(id)).then(() => {
      dispatch(getPlayerOptions({ playerType: PlayType.NBA }));
    });
  };

  useEffect(() => {
    dispatch(getPlayerOptions({ playerType: PlayType.NBA }));
  }, [dispatch]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
          >
            <TableCell>Position</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Draft Year</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {savedOptions.length === 0 ? (
            <TableRow
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
            >
              <TableCell colSpan={5}>No saved options available.</TableCell>
            </TableRow>
          ) : (
            savedOptions.map((option, index) => (
              <TableRow
                key={index}
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
              >
                <TableCell>
                  {option.position === "-1" ? "All" : option.position}
                </TableCell>
                <TableCell>
                  {option.country === "-1" ? "USA & Canada" : option.country}
                </TableCell>
                <TableCell>{option.draft}</TableCell>
                <TableCell>
                  <Button
                    variant={
                      activeViewId === option.id ? "contained" : "outlined"
                    }
                    color={activeViewId === option.id ? "primary" : "inherit"}
                    onClick={() => {
                      setActiveViewId(option.id);
                      onViewFilteredPlayers(option);
                      setStatusFilter("None");
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteOption(option.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NBAOptionTableContainer;
