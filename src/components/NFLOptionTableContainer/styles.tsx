import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: Theme) => ({
  tableContainer: {
    marginTop: "20px",
  },
  pagination: {
    minHeight: "40px",
  },
}));

export default styles;
