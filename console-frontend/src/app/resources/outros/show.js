import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PaperContainer from 'app/layout/paper-container'
import ProfilePic from 'app/resources/personas/profile-pic'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiOutroShow } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { Link } from 'react-router-dom'
import { withTitle } from 'ext/recompose/with-title'

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`

const PersonaShow = ({ outro }) => (
  <PaperContainer>
    <ButtonsContainer>
      <Button color="primary" component={Link} to={routes.outroEdit(outro.id)}>
        <EditIcon />
        {'Edit'}
      </Button>
    </ButtonsContainer>
    <List>
      <ListItem>
        <ProfilePic persona={outro.persona} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Persona Name"
          secondary={outro.persona.name}
          secondaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    </List>
  </PaperContainer>
)

export default compose(
  withTitle('Outro'),
  withState('outro', 'setOutro', {}),
  withState('isLoading', 'setIsLoading', true),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setOutro, match } = this.props
      const id = match.params.outroId
      const json = await apiOutroShow(id)
      setOutro(json)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonaShow)
