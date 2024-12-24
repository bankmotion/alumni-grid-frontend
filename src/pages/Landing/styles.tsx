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
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  content: {
    width: "70%",
    maxWidth: "900px",
    padding: "40px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    opacity: 0.8,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "20px",
    },
  },
  gameTitle: {
    color: "#333",
    fontWeight: 700,
    fontSize: "2.5rem",
    marginBottom: "24px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
      fontSize: "clamp(2rem, 2.5vw, 3rem)",
    },
  },
  description: {
    color: "#222",
    fontSize: "1.2rem",
    lineHeight: "1.8",
    marginBottom: "24px",
    padding: "0 80px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      lineHeight: "1.5",
      marginBottom: "16px",
      padding: "0 10px",
    },
  },
  startButton: {
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#FF4F00",
    color: "#fff",
    fontSize: "1.1rem",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "#FF6F20",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px",
      fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
    },
  },
}));

export default styles;
