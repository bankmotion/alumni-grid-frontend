import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  //   landingBoard: {
  //     width: "100%",
  //     height: "100vh",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     background: "url(/assets/background.jpg)",
  //     backgroundSize: "100% 100%",
  //     backgroundRepeat: "no-repeat",

  //     [theme.breakpoints.down("sm")]: {
  //       height: "auto",
  //       flexDirection: "column",
  //       padding: "24px 0",
  //       minHeight: "100vh",
  //       justifyContent: "start",
  //     },
  //   },
  landingBoard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #FF4F00, #FFB600)", // Example vibrant gradient
    //background: "url(/assets/background.jpg)",
    backgroundColor: "#1A1A2E",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative", // For absolute positioning of overlay
  },
  content: {
    width: "70%",
    padding: "40px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly more opaque for readability
    opacity: 0.8,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
  },
  gameTitle: {
    color: "#333",
    fontWeight: 700,
    marginBottom: "24px",
    fontSize: "3rem", // Larger font for emphasis
  },
  description: {
    color: "#222",
    fontSize: "1.2rem",
    lineHeight: "1.8",
    marginBottom: "24px",
  },
  startButton: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "8px",
    backgroundColor: "#FF4F00", // Bright button color
    color: "#fff", // White text for contrast
    "&:hover": {
      backgroundColor: "#FF6F20", // Slightly darker on hover
    },
  },
}));

export default styles;
