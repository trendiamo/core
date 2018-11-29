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
import styled from 'styled-components'
import { apiPersonaShow } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { Link } from 'react-router-dom'
import { withTitle } from 'ext/recompose/with-title'

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`

const PersonaShow = ({ persona }) => (
  <PaperContainer>
    <ButtonsContainer>
      <Button color="primary" component={Link} to={routes.personaEdit(persona.id)}>
        <EditIcon />
        {'Edit'}
      </Button>
    </ButtonsContainer>
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
  withTitle('Persona'),
  withState('persona', 'setPersona', {}),
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
