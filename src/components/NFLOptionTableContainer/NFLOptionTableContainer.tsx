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
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import useStyles from "./styles";
import { NFLPlayerOption } from "../../models/interface";
import { AppDispatch } from "../../app/store";
import { deletePlayerOption } from "../../reducers/game.slice";
import { getNFLPlayerOptions } from "../../reducers/game.slice";

interface NFLPlayerTableContainerProps {
  savedOptions: NFLPlayerOption[];
  //onViewFilteredPlayers: (option: PlayerOption) => void;
}
const NFLOptionTableContainer: React.FC<NFLPlayerTableContainerProps> = ({
  savedOptions,
  //onViewFilteredPlayers,
}) => {
  console.log("savedOption", savedOptions);
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteOption = (id: number) => {
    dispatch(deletePlayerOption(id)).then(() => {
      dispatch(getNFLPlayerOptions());
    });
  };

  useEffect(() => {
    dispatch(getNFLPlayerOptions());
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
                <TableCell>{option.position}</TableCell>
                <TableCell>{option.experience}</TableCell>
                <TableCell>{option.ageFrom}</TableCell>
                <TableCell>{option.ageTo}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    //onClick={() => onViewFilteredPlayers(option)}
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
