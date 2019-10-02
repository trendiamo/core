import Footer from './footer'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg'
import { Typography } from '@material-ui/core'

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 10px 24px 20px;
  position: relative;
  @media (min-width: 960px) {
    padding: 10px 60px 20px;
  }
`

const ContentScrollContainer = styled.div`
  max-height: auto;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const IconContainer = styled.div`
  text-align: center;
  padding: 0px 0 10px;
  margin-top: 0;
  @media (min-width: 960px) {
    margin-top: 35px;
  }
`

const Content = ({ affiliation }) => {
  return (
    <MainContainer>
      <ContentScrollContainer>
        <IconContainer>
          <LinkIcon />
        </IconContainer>
        <ContentContainer>
          <Typography variant="h5">{'Create custom affiliate links'}</Typography>
          <Typography variant="body2">
            {`You can create customized affiliate links to be able to link to any page of ${
              affiliation.brand.name
            }’s website. This can be helpful if you want to directly link to a specific product page or category.`}
          </Typography>
          <br />
          <Typography variant="body2">
            {
              'To create your customized links simply paste a link from the website below and click the button. You can create as many custom links as you want and they will never stop working.'
            }
          </Typography>
        </ContentContainer>
      </ContentScrollContainer>
      <Footer affiliation={affiliation} />
    </MainContainer>
  )
}

export default Content
