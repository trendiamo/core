import styled from 'styled-components'
import { h } from 'preact'

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #f3fdff, #fff);
  color: #333;
  height: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InnerContent = styled.div`
  flex: 1;
  padding-left: 60px;
  padding-right: 60px;
  text-align: center;
`

const PoweredBy = styled(({ className }) => (
  <div className={className}>
    {'Trusted by '}
    <a href="https://trendiamo.com" rel="noopener noreferrer" target="_blank">
      {'Trendiamo'}
    </a>
  </div>
))`
  color: #999;
  font-size: small;
  text-align: center;
  a {
    color: #5d69b9;
    text-decoration: none;
  }
`

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const InfluencerImg = styled.img`
  margin-top: 80px;
  margin-bottom: 1rem;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  object-fit: cover;
`

const Footer = styled.div`
  display: flex;
  width: 100%;
`

const Hr = styled.hr`
  width: 3rem;
  border-top: solid 1px #282828;
  border-bottom: 0;
`

const Outro = ({ influencer }) => (
  <Wrapper>
    <InnerContent>
      <InfluencerImg src={influencer.profilePic.url} />
      <Name>{influencer.name}</Name>
      <p>{'Thanks for buying my recommendation.'}</p>
      <Hr />
      <p>{'Enjoy and let me know what you think! 🙌'}</p>
    </InnerContent>
    <Footer>
      <div style={{ flex: 1 }} />
      <PoweredBy />
    </Footer>
  </Wrapper>
)

export default Outro
