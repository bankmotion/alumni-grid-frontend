import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gridSummary: {
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
    },
  },

  gridContainer: {
    position: "relative",
    display: "grid",
    width: "70%",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gridTemplateRows: "repeat(3, 1fr)", // 3 rows
    gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginLeft: "15%",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)", // 2 columns for smaller screens
      gap: theme.spacing(1.5),
    },
  },

  gridItem: {
    position: "relative",
    width: "100%",
    paddingTop: "100%", // Makes the grid item a square
    maxHeight: "70px",
    backgroundColor: theme.palette.grey[200],
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "8px",
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s, box-shadow 0.2s",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4],
    },

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  gridContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "clamp(0.875rem, 2vw, 1.5rem)",
  },

  correctBox: {
    backgroundColor: "#4caf50",
    borderColor: "#388e3c",

    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },

  wrongBox: {
    backgroundColor: "#f44336",
    borderColor: "#d32f2f",

    "&:hover": {
      backgroundColor: "#f44336",
    },
  },

  shareButtonContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },

  shareButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: "clamp(0.7rem, 1vw, 1rem)",
    padding: theme.spacing(0.5, 1.5),
    borderRadius: "4px",
  },
}));

export default styles;
