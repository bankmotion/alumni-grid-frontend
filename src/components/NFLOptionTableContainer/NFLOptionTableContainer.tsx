import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

import {
  deletePlayerOption,
  getPlayerOptions,
} from "../../reducers/game.slice";
import { PlayType } from "../../constant/const";
import { useAppDispatch } from "../../app/hooks";
import { PlayerOption } from "../../models/interface";

interface NFLPlayerTableContainerProps {
  savedOptions: PlayerOption[];
  onViewFilteredPlayers: (option: PlayerOption) => void;
  setStatusFilter: (
    statusFilter: "All" | "Active" | "Inactive" | "None"
  ) => void;
  activeViewId: number | null;
  setActiveViewId: (activeViewId: number | null) => void;
}
const NFLOptionTableContainer: React.FC<NFLPlayerTableContainerProps> = ({
  savedOptions,
  onViewFilteredPlayers,
  setStatusFilter,
  activeViewId,
  setActiveViewId,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteOption = (id: number) => {
    dispatch(deletePlayerOption({ id, type: PlayType.NFL }))
      .unwrap()
      .then(() => {
        dispatch(getPlayerOptions({ playType: PlayType.NFL }));
      });
  };

  useEffect(() => {
    dispatch(getPlayerOptions({ playType: PlayType.NFL }));
  }, [dispatch]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Experience(From)</TableCell>
            <TableCell>Age(From)</TableCell>
            <TableCell>Age(To)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {savedOptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No saved options available.</TableCell>
            </TableRow>
          ) : (
            savedOptions.map((option, index) => (
              <TableRow key={option.id}>
                <TableCell>
                  {option.position === "-1" ? "All" : option.position}
                </TableCell>
                <TableCell>{option.experience} year</TableCell>
                <TableCell>{option.ageFrom}</TableCell>
                <TableCell>{option.ageTo}</TableCell>
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

export default NFLOptionTableContainer;
