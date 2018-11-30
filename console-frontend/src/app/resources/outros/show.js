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
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiOutroShow } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { Link } from 'react-router-dom'

const Actions = ({ route }) => (
  <Button color="primary" component={Link} to={route}>
    <EditIcon />
    {'Edit'}
  </Button>
)

const OutroShow = ({ outro }) => (
  <PaperContainer>
    <Typography variant="subtitle1">{'Outro'}</Typography>
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
  withState('outro', 'setOutro', {}),
  withAppBarContent(({ match }) => ({
    Actions: <Actions route={routes.outroEdit(match.params.outroId)} />,
    breadcrumbs: [{ text: 'Outros', route: routes.outrosList() }, { text: 'Outro' }],
  })),
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
)(OutroShow)
