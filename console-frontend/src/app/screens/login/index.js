import { apiSignIn } from "../../auth/utils";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose, withHandlers, withState } from "recompose";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing.unit
  },
  form: {
    marginTop: theme.spacing.unit,
    width: "100%"
  },
  layout: {
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
      width: 400
    }
  },
  paper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const CustomLoginJSX = ({
  errors,
  loginForm,
  loginSubmit,
  setLoginValue,
  classes,
  onForgotPassword
}) => (
  <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="headline">{"Log in"}</Typography>
        <form className={classes.form} onSubmit={loginSubmit}>
          {errors && (
            <Typography align="center" color="error" variant="body2">
              <li>{errors}</li>
            </Typography>
          )}
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="email">{"Email Address"}</InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              id="email"
              name="email"
              onChange={setLoginValue}
              value={loginForm.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="password">{"Password"}</InputLabel>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              onChange={setLoginValue}
              required
              type="password"
              value={loginForm.password}
            />
          </FormControl>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="raised"
          >
            {"Log in"}
          </Button>
          <Button
            className={classes.submit}
            color="secondary"
            fullWidth
            onClick={onForgotPassword}
            type="submit"
            variant="raised"
          >
            {"Forgot Password"}
          </Button>
        </form>
      </Paper>
    </main>
  </React.Fragment>
);

const CustomLogin = compose(
  withState("loginForm", "setLoginForm", { email: "", password: "" }),
  withState("errors", "setErrors", null),
  withHandlers({
    loginSubmit: ({ loginForm, setErrors }) => async event => {
      event.preventDefault();
      await apiSignIn(
        { user: { email: loginForm.email, password: loginForm.password } },
        setErrors
      );
      if (localStorage.authToken && localStorage.authEmail) {
        window.location.href = "/";
      }
    },
    onForgotPassword: () => event => {
      event.preventDefault();
      window.location.href = "#/request_password_reset";
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
  })
)(CustomLoginJSX);

export default withStyles(styles)(CustomLogin);
