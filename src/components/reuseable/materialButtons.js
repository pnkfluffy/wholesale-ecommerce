import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";

export const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[500],
    },
  },
}))(Button);

export const greyButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[800],
    },
  },
}))(Button);
