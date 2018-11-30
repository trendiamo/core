import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PaperContainer from 'app/layout/paper-container'
import ProfilePic from './profile-pic'
import React from 'react'
import routes from 'app/routes'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiPersonaShow } from 'utils'
import { branch, compose, lifecycle, renderComponent, withProps, withState } from 'recompose'
import { Link } from 'react-router-dom'

const Actions = ({ persona }) => (
  <Button color="primary" component={Link} to={routes.personaEdit(persona.id)}>
    <EditIcon />
    {'Edit'}
  </Button>
)

const PersonaShow = ({ persona, title }) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <List>
      <ListItem>
        <ProfilePic persona={persona} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Name" secondary={persona.name} secondaryTypographyProps={{ variant: 'body2' }} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Description"
          secondary={persona.description}
          secondaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </List>
  </PaperContainer>
)

export default compose(
  withState('persona', 'setPersona', {}),
  withProps(({ persona }) => ({ title: persona.name || 'Persona' })),
  withAppBarContent(({ persona, title }) => ({
    Actions: <Actions persona={persona} />,
    breadcrumbs: [{ text: 'Personas', route: routes.personasList() }, { text: title }],
  })),
  withState('isLoading', 'setIsLoading', true),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setPersona, match } = this.props
      const id = match.params.personaId
      const json = await apiPersonaShow(id)
      setIsLoading(false)
      setPersona(json)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonaShow)
