import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  gameBoard: {
    // width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column",
      padding: "16px",
      minHeight: "100vh",
      justifyContent: "flex-start",
    },
  },

  nbaBg: {
    background: "url(/assets/background.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  nflBg: {
    background: "url(/assets/nflbg.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
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
      marginBottom: "16px",
    },
  },

  middlePanel: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "16px",
      width: "100%",
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
      marginTop: "32px",
      gap: "2px",
      padding: "2px",
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
    wordBreak: "break-word",

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
      width: "26vw",
      height: "26vw",
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
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      alignItems: "center",
      gap: "8px",
    },
  },

  guessLeftTxt: {
    fontSize: "clamp(18px, 3vw, 32px)",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  score: {
    fontSize: "clamp(28px, 5vw, 50px)",
    // color: "#d93232",
    color: "#f39c12",
    fontWeight: "bold",
    textAlign: "center",
  },

  giveUpBtn: {
    color: "white",
    maxWidth: "200px",
    marginTop: "32px",
    padding: "8px 16px",
    fontSize: "clamp(12px, 1.5vw, 16px)",

    [theme.breakpoints.down("sm")]: {
      marginTop: "8px",
      fontSize: "clamp(10px, 1.5vw, 14px)",
    },
  },

  remainTime: {
    color: "white",
    fontSize: "clamp(18px, 2vw, 24px)",
    textAlign: "center",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    position: "absolute",
    right: 20,
    top: 20,

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "8px",
    },
  },

  onlyDesktop: {
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  infoButton: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    backgroundColor: "#0077b6",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#005f8a",
    },

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      padding: 0,
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  linkButton: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    backgroundColor: "#0077b6",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#005f8a",
    },

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      padding: 0,
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  nbaColor: {
    backgroundColor: "#FF4F00",

    "&:hover": {
      backgroundColor: "#FF6F20",
    },
  },

  nflColor: {
    backgroundColor: "#044e5d",

    "&:hover": {
      backgroundColor: "#056376",
    },
  },

  infoIcon: {
    display: "flex",
    fontSize: "100%",
  },

  leaderBoard: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f76c6c",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#d45c5c",
    },

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      padding: 0,
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  summary: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f39c12",
    color: "#fff",
    fontSize: "clamp(12px, 1.5vw, 14px)",

    "&:hover": {
      backgroundColor: "#d45c5c",
    },

    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      padding: 0,
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  leaderBoardIcon: {
    display: "flex",
  },
}));

export default styles;
