import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  landingBoard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #FF4F00, #FFB600)",
    backgroundColor: "#1A1A2E",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  content: {
    width: "90%",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    opacity: 0.8,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      padding: "40px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
  gameTitle: {
    color: "#333",
    fontWeight: 700,
    marginBottom: "16px",
    fontSize: "clamp(2rem, 2.5vw, 3rem)",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      marginBottom: "24px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3rem",
    },
  },
  description: {
    color: "#222",
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
    lineHeight: "1.5",
    marginBottom: "16px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      lineHeight: "1.8",
      marginBottom: "24px",
    },
  },
  startButton: {
    fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#FF4F00",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#FF6F20",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1rem",
      padding: "12px 24px",
    },
  },
}));

export default styles;
