import PersonaInstagram from 'shared/persona-instagram'
import React from 'react'
import styled from 'styled-components'

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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
`

const PersonaImg = styled.img`
  margin-bottom: 1rem;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  object-fit: cover;
`

const Hr = styled.hr`
  width: 3rem;
  border-top: solid 1px #282828;
  border-bottom: 0;
`

const Outro = ({ persona }) => (
  <Wrapper>
    <InnerContent>
      <PersonaImg src={persona.profilePic.url} />
      <Name>
        <span style={{ verticalAlign: 'top' }}>{persona.name}</span>
        <PersonaInstagram color="black" size="20px" url={persona.instagramUrl} />
      </Name>
      <p>{'Thanks for buying my recommendation.'}</p>
      <Hr />
      <p>{'Enjoy and let me know what you think! 🙌'}</p>
    </InnerContent>
  </Wrapper>
)

export default Outro
