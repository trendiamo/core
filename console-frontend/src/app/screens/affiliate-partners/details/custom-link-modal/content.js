import Footer from './footer'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg'
import { Typography } from '@material-ui/core'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentScrollContainer = styled.div`
  max-height: auto;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const IconContainer = styled.div`
  text-align: center;
  padding: 0px 0 16px;
  margin-top: 0;

  @media (min-width: 960px) {
    margin-top: 36px;
  }
`

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 40px 24px 16px;
  position: relative;

  @media (min-width: 960px) {
    padding: 8px 40px 16px;
  }
`

const ContentTitle = styled(props => <Typography variant="h5" {...props} />)`
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: initial;
  }
`

const ContentText = styled(props => <Typography variant="body2" {...props} />)`
  margin-bottom: 16px;
`

const Content = ({ affiliation }) => (
  <MainContainer>
    <ContentScrollContainer>
      <IconContainer>
        <LinkIcon />
      </IconContainer>
      <ContentContainer>
        <ContentTitle>{'Create custom affiliate links'}</ContentTitle>
        <ContentText>
          {`You can create customized affiliate links to be able to link to any page of ${affiliation.brand.name}’s website. This can be helpful if you want to directly link to a specific product page or category.`}
        </ContentText>
        <ContentText>
          {'To create your customized links simply paste a link from the website below and click the button. '}
          <b>{'You can create as many custom links as you want and they will never stop working.'}</b>
        </ContentText>
      </ContentContainer>
    </ContentScrollContainer>
    <Footer affiliation={affiliation} />
  </MainContainer>
)

export default Content
