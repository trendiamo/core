import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import EditIcon from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PaperContainer from 'app/layout/paper-container'
import ProfilePic from './profile-pic'
import React from 'react'
import styled from 'styled-components'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiInfluencerShow } from 'utils'
import { compose, lifecycle, withState } from 'recompose'
import { Link } from 'react-router-dom'

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`

const CircularProgressContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const InfluencerShow = ({ influencer, isLoading }) => (
  <React.Fragment>
    {isLoading ? (
      <CircularProgressContainer>
        <CircularProgress size={80} />
      </CircularProgressContainer>
    ) : (
      <PaperContainer>
        <ButtonsContainer>
          <Button color="primary" component={Link} to="edit">
            <EditIcon />
            {'Edit'}
          </Button>
        </ButtonsContainer>
        <List>
          <ListItem>
            <ProfilePic influencer={influencer} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" secondary={influencer.name} secondaryTypographyProps={{ variant: 'body1' }} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={influencer.description}
              secondaryTypographyProps={{ variant: 'body1' }}
            />
          </ListItem>
        </List>
      </PaperContainer>
    )}
  </React.Fragment>
)

export default compose(
  withRaTitle('Influencer'),
  withState('influencer', 'setInfluencer', {}),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setInfluencer, match } = this.props
      const id = match.params.influencerId
      const json = await apiInfluencerShow(id, setInfo)
      setIsLoading(false)
      setInfluencer(json)
    },
  })
)(InfluencerShow)
