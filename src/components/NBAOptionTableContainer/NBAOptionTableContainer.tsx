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
import DeleteIcon from "@mui/icons-material/Delete";

import useStyles from "./styles";
import { PlayerOption } from "../../models/interface";
import { AppDispatch, RootState } from "../../app/store";
import { deletePlayerOption } from "../../reducers/game.slice";
import { getPlayerOptions } from "../../reducers/game.slice";
import { PlayType } from "../../constant/const";

interface NBAPlayerTableContainerProps {
  savedOptions: PlayerOption[];
  onViewFilteredPlayers: (option: PlayerOption) => void;
}

const NBAOptionTableContainer: React.FC<NBAPlayerTableContainerProps> = ({
  savedOptions,
  onViewFilteredPlayers,
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [activeViewId, setActiveViewId] = useState<number | null>(null);

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
