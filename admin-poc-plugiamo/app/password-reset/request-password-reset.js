import { apiPasswordEmailLink } from '../auth/utils'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { compose, withHandlers, withState } from 'recompose'

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing.unit,
  },
  form: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  layout: {
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 400,
    },
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

const CustomPasswordResetJSX = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue, classes, submitted }) => (
  <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
          <Typography variant="headline">{'Reset Password'}</Typography>
          <form className={classes.form} onSubmit={passwordChangeSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">{'Email'}</InputLabel>
            <Input
              name="email"
              type="email"
              onChange={setPasswordFormValue}
              required
              id="email"
              value={passwordForm.email}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            className={classes.submit}
            >{'Send Reset Email'}
          </Button>
        </form>
      </Paper>
    </main>
  </React.Fragment>
)

const CustomPasswordReset = compose(
  withState('passwordForm', 'setPasswordForm', { email: '' }),
  withState('submitted', 'setSubmitted', false),
  withState('errors', 'setErrors', null),
  withHandlers({
    passwordChangeSubmit: ({ passwordForm, setSubmitted, submitted, errors }) => async event => {
      event.preventDefault()
      errors ? submitted : setSubmitted(true)
      await apiPasswordEmailLink({ user: { email: passwordForm.email } })
      alert('Email sent')
    },
    setPasswordFormValue: ({ passwordForm, setPasswordForm }) => event =>
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value }),
  })
)(CustomPasswordResetJSX)

export default withStyles(styles)(CustomPasswordReset)
