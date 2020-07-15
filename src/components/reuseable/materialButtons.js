import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";

export const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
}))(Button);

export const GrayButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[800],
    },
  },
}))(Button);
