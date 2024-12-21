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
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  backButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  userSummary: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    "& h4": {
      fontWeight: "bold",
      margin: theme.spacing(1, 0),
    },
  },
  gridSummary: {
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gridTemplateRows: "repeat(3, 1fr)", // 3 rows
    gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  gridItem: {
    position: "relative",
    width: "100%", // Use relative sizing for responsive behavior
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
  },
  shareButtonContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  achieveTable: {
    width: "100%",
    maxWidth: "800px",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  tableTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    "& th, & td": {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1.5),
      textAlign: "center",
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
  },
}));

export default styles;
