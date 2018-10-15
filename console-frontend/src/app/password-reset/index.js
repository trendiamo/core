import { apiPasswordReset } from "../auth/utils";
import { Authenticated } from "react-admin";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import queryString from "query-string";
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

const CustomPasswordResetJSX = ({
  errors,
  passwordForm,
  passwordResetSubmit,
  setFieldValue,
  classes,
  location
}) => (
  <Authenticated authParams={{ foo: "bar" }} location={location}>
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">{"Reset Password"}</Typography>
          <form className={classes.form} onSubmit={passwordResetSubmit}>
            {errors && (
              <Typography align="center" color="error" variant="body2">
                <li>{errors}</li>
              </Typography>
            )}
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="email">{"New Password"}</InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="email"
                name="fieldOne"
                onChange={setFieldValue}
                type="password"
                value={passwordForm.fieldOne}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="password">{"Repeat Password"}</InputLabel>
              <Input
                autoComplete="current-password"
                id="password"
                name="fieldTwo"
                onChange={setFieldValue}
                required
                type="password"
                value={passwordForm.fieldTwo}
              />
            </FormControl>
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              type="submit"
              variant="raised"
            >
              {"Reset"}
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  </Authenticated>
);

const CustomPasswordReset = compose(
  withState("passwordForm", "setPasswordForm", {
    fieldOne: "",
    fieldTwo: ""
  }),
  withState("errors", "setErrors", null),
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setErrors }) => async event => {
      event.preventDefault();
      if (passwordForm.fieldOne === passwordForm.fieldTwo) {
        await apiPasswordReset(
          {
            user: {
              password: passwordForm.fieldTwo,
              reset_password_token: queryString.parse(
                window.location.hash.split("?")[1]
              )["reset_password_token"]
            }
          },
          setErrors
        );
      } else {
        setErrors("Passwords don't match");
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault();
      const value = event.target.value;
      setPasswordForm({ ...passwordForm, [event.target.name]: value });
    }
  })
)(CustomPasswordResetJSX);

export default withStyles(styles)(CustomPasswordReset);
