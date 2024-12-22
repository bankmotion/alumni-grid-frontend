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
      //transform: "scale(1.02)",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "24px",
      margin: "30px auto",
    },
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  title: {
    fontWeight: "bold",
  },
  toggleButton: {
    cursor: "pointer",
  },

  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  checkboxContainer: {
    textAlign: "left",
    "& .MuiTypography-root": {
      fontWeight: 500,
      color: "#004d40",
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
    },
  },
  yearInput: {
    width: "100px",
    "& .MuiInputBase-root": {
      fontSize: "1rem",
    },
    "& .MuiInputLabel-root": {
      color: "#00796b",
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
    fontSize: "1rem",
    textTransform: "none",
    borderRadius: "12px",
    transition: "background 0.3s ease, transform 0.2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #004d40, #00796b)",
      transform: "translateY(-2px)",
    },
  },
}));

export default styles;
