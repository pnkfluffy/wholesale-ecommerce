import { Button, OutlinedInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";

export const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[500],
    },
  },
}))(Button);

export const LightGreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
}))(Button);

export const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[600],
    "&:hover": {
      backgroundColor: red[900],
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

export const classes = withStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
  },
}));
