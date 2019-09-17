import Footer from './footer'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 10px 60px 20px;
  position: relative;
`

const ContentScrollContainer = styled.div`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const IconContainer = styled.div`
  text-align: center;
  padding: 35px 0 10px;
`

const Content = ({ affiliation }) => {
  return (
    <MainContainer>
      <ContentScrollContainer>
        <IconContainer>
          <img alt="" src="/img/icons/link.svg" />
        </IconContainer>
        <ContentContainer>
          <Typography variant="h5">{'Create custom affiliate links'}</Typography>
          <p>
            {`You can create customized affiliate links to be able to link to any page of ${
              affiliation.brand.name
            }’s website. This can be helpful if you want to directly link to a specific product page or category.`}
          </p>
          <p>
            {
              'To create your customized links simply paste a link from the website below and click the button. You can create as many custom links as you want and they will never stop working.'
            }
          </p>
        </ContentContainer>
      </ContentScrollContainer>
      <Footer affiliation={affiliation} />
    </MainContainer>
  )
}

export default Content
