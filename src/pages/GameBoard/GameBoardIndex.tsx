import { Box, Button } from "@mui/material";

import useStyles from "./styles";

const GameBoardIndex = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.gameBoard}>
      <Box className={classes.leftPanel}></Box>
      <Box className={classes.gridBox}>
        <Box className={classes.gridItem}>1</Box>
        <Box className={classes.gridItem}>2</Box>
        <Box className={classes.gridItem}>3</Box>
        <Box className={classes.gridItem}>4</Box>
        <Box className={classes.gridItem}>5</Box>
        <Box className={classes.gridItem}>6</Box>
        <Box className={classes.gridItem}>7</Box>
        <Box className={classes.gridItem}>8</Box>
        <Box className={classes.gridItem}>9</Box>
      </Box>
      <Box className={classes.rightPanel}>
        <Box className={classes.guessLeftTxt}>GUESS LEFT</Box>
        <Box className={classes.score}>10</Box>
        <Button className={classes.giveUpBtn} variant="contained">
          Give Up
        </Button>
      </Box>
    </Box>
  );
};

export default GameBoardIndex;
