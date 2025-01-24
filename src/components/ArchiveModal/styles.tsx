import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  archiveModal: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: "60%",
    left: "50%",
    scale: 0.95,
    transform: "translate(-50%, -50%)",
    background: "white",
    color: theme.palette.getContrastText("#FFD60A"),
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
    padding: "16px 32px 32px",
    width: "40%",
    height: "auto",
    textAlign: "center",
    marginBottom: "20%",
    maxHeight: "500px",
    overflowY: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "75%",
      marginTop: "5%",
    },
  },

  archiveHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "cneter",
    width: "100%",
  },

  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  archiveTitle: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "24px",
  },

  closeButton: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(2),
    "&:hover": {
      color: theme.palette.error.main,
    },
    [theme.breakpoints.down("sm")]: {
      right: theme.spacing(1),
    },
  },

  achieveTable: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: "800px",
    marginTop: theme.spacing(1),
    textAlign: "center",
    // overflowY: "auto",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },

  tableTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "24px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontFamily: theme.typography.fontFamily,

    "& th, & td": {
      padding: theme.spacing(1),
      textAlign: "center",
      fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
    },

    "& th": {
      fontWeight: "bold",
      color: theme.palette.text.primary,
      borderBottom: `2px solid ${theme.palette.divider}`,
      fontSize: "1rem",
    },

    "& td": {
      color: theme.palette.text.secondary,
      fontSize: "0.9rem",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    "& tbody tr": {
      transition: "background-color 0.2s ease",
    },

    "& tbody tr:hover": {
      backgroundColor: theme.palette.action.hover,
    },

    "& tbody tr:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[50],
    },

    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: "white",
    },

    "& button": {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 0.5),
      textTransform: "none",
      borderRadius: "5px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.6rem",
      },
    },
  },
}));

export default styles;
