import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  dialogPaper: {
    borderRadius: "16px",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    padding: "24px",
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)", // Similar to the admin board background
    maxWidth: "500px",
    margin: "0 auto",
  },
  dialogTitle: {
    fontWeight: "bold",
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", // Responsive title size
    color: "#004d40",
    textAlign: "center",
  },

  editTextBox: {
    maxWidth: 340,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  dialogContent: {
    textAlign: "center",
    padding: "16px",
    "& .MuiTypography-root": {
      fontSize: "clamp(1rem, 2vw, 1.125rem)", // Responsive text size
      fontWeight: 500,
      color: "#004d40",
    },
  },

  editText: {
    width: "100%",
  },

  dialogActions: {
    justifyContent: "center",
    marginTop: "20px",
  },
  confirmButton: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #00796b, #004d40)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // Responsive font size
    textTransform: "none",
    borderRadius: "12px",
    "&:hover": {
      background: "linear-gradient(135deg, #004d40, #00796b)",
      transform: "translateY(-2px)",
    },
  },
  cancelButton: {
    padding: "10px 20px",
    color: "#00796b",
    borderColor: "#00796b",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
    "&:hover": {
      background: "#004d40",
      color: "#fff",
    },
  },
}));

export default styles;
