import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gameBoard: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "url(/assets/background.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "16px",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column",
      padding: "16px",
      minHeight: "100vh",
      justifyContent: "flex-start",
    },
  },

  gameTitle: {
    fontSize: "clamp(30px, 32px, 36px)",
    fontWeight: "bold",
    //color: "#bdc3c7",
    color: "#f39c12",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "8px",
    borderRadius: "4px",
  },

  leftPanel: {
    minWidth: "200px",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginBottom: "16px",
    },
  },

  gridBox: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "8px",
    padding: "8px",
    borderRadius: "8px",
    marginTop: "16px",
    background: "rgba(126, 126, 137, 0.55)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)", // Adjust grid for smaller screens
      marginTop: "12px",
      gap: "4px",
    },
  },

  personAva: {
    position: "absolute",
    color: "#363232",
    fontSize: "clamp(70px, 10vw, 150px)",

    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(50px, 8vw, 100px)",
    },
  },

  playerName: {
    fontSize: "clamp(18px, 2.5vw, 30px)",

    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(14px, 2vw, 24px)",
    },
  },

  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    border: "5px solid #656565",
    color: "#2b2a2a",
    fontWeight: "bold",
    fontSize: "clamp(14px, 1.5vw, 18px)",
    width: "clamp(80px, 12vw, 200px)",
    height: "clamp(80px, 12vw, 200px)",
    borderRadius: "8px",
    transition: "0.3s",
    position: "relative",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#ffffff",
      opacity: "0.9",
      borderColor: "#656565",
    },

    [theme.breakpoints.down("sm")]: {
      width: "clamp(60px, 8vw, 100px)",
      height: "clamp(60px, 8vw, 100px)",
    },
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

  rightPanel: {
    minWidth: "200px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center", // Center the contents
    justifyContent: "center", // Center vertically

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      alignItems: "center", // Ensure alignment on small screens
    },
  },

  guessLeftTxt: {
    fontSize: "clamp(18px, 3vw, 32px)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Center text for better alignment
  },

  score: {
    fontSize: "clamp(28px, 5vw, 50px)",
    color: "#d93232",
    fontWeight: "bold",
    textAlign: "center", // Center score text
  },

  giveUpBtn: {
    color: "white",
    maxWidth: "200px",
    marginTop: "32px",
    padding: "8px 16px",
    fontSize: "clamp(12px, 1.5vw, 16px)",

    [theme.breakpoints.down("sm")]: {
      marginTop: "18px",
      fontSize: "clamp(10px, 1.5vw, 14px)", // Adjust font size for small screens
    },
  },

  remainTime: {
    color: "white",
    fontSize: "clamp(18px, 2vw, 24px)",
    textAlign: "center", // Center text for remain time
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    position: "absolute",
    right: 20,
    top: 20,

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center", // Center buttons on small devices
      position: "static", // Adjust position
      marginTop: "16px",
      flexDirection: "column", // Stack buttons vertically
      gap: "8px", // Adjust spacing between buttons
    },
  },

  backButton: {
    backgroundColor: "#0077b6",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#005f8a",
    },
  },

  leaderBoard: {
    backgroundColor: "#f76c6c",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#d45c5c",
    },
  },
}));

export default styles;
