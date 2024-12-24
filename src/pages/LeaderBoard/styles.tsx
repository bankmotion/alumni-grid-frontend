import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  leaderboardPage: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  },

  title: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "clamp(3rem, 3vw, 2.5rem)",

    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    },
  },

  backButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1.5, 3),
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      position: "fixed",
      right: 10,
      top: 10,
      width: "40px",
      height: "40px",
      minWidth: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
  },

  userSummary: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    "& h4": {
      fontWeight: "bold",
      margin: theme.spacing(1, 0),
      fontSize: "clamp(1rem, 2vw, 1.5rem)",
    },
  },

  gridSummary: {
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
    },
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gridTemplateRows: "repeat(3, 1fr)", // 3 rows
    gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)", // 2 columns for smaller screens
      gap: theme.spacing(1.5),
    },
  },

  gridItem: {
    position: "relative",
    width: "100%",
    paddingTop: "100%", // Makes the grid item a square
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
      marginTop: theme.spacing(1),
    },
  },

  shareButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
    padding: theme.spacing(0.5, 1.5),
    borderRadius: "4px",
  },

  achieveTable: {
    width: "100%",
    maxWidth: "800px",
    marginTop: theme.spacing(4),
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },

  tableTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "clamp(1rem, 2vw, 1.5rem)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",

    "& th, & td": {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1.5),
      textAlign: "center",
      fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
    },

    "& th": {
      backgroundColor: theme.palette.grey[200],
      fontWeight: "bold",
      color: theme.palette.text.primary,
    },

    "& tbody tr:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[100],
    },

    "& tbody tr:hover": {
      backgroundColor: theme.palette.action.hover,
    },

    "& button": {
      fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
      padding: theme.spacing(0.5, 0.5),
      borderRadius: "4px",
    },
  },

  onlyDesktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default styles;
