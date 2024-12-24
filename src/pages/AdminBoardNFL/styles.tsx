import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  adminBoard: {
    padding: "32px",
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    borderRadius: "16px",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    maxWidth: "760px",
    margin: "50px auto", // Center the board with some margin
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "24px",
      margin: "30px auto",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "16px",
      margin: "20px auto",
    },
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)", // Responsive font size
    color: "#004d40",
  },
  toggleButton: {
    cursor: "pointer",
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Responsive font size
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1), // Adjust margin for small screens
    },
  },
  checkboxContainer: {
    textAlign: "left",
    "& .MuiTypography-root": {
      fontWeight: 500,
      color: "#004d40",
      fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Responsive font size
    },
    "& .MuiCheckbox-root": {
      color: "#00796b",
      "&.Mui-checked": {
        color: "#004d40",
      },
    },
  },
  checkboxWithInput: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
    "& .MuiFormControlLabel-root": {
      color: "#004d40",
      fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Responsive font size
    },
  },
  yearInput: {
    width: "100px",
    "& .MuiInputBase-root": {
      fontSize: "1rem",
    },
    "& .MuiInputLabel-root": {
      color: "#00796b",
      fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Responsive font size
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#004d40",
      },
      "&:hover fieldset": {
        borderColor: "#00796b",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#004d40",
      },
    },
  },
  button: {
    marginTop: "32px",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #00796b, #004d40)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "clamp(1rem, 2vw, 1.125rem)", // Responsive font size
    textTransform: "none",
    borderRadius: "12px",
    transition: "background 0.3s ease, transform 0.2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #004d40, #00796b)",
      transform: "translateY(-2px)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px", // Smaller padding for mobile
      fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Smaller font size for mobile
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "16px", // Less margin for smaller screens
    },
  },
}));

export default styles;