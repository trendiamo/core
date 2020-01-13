import brunoFace from '../../images/about-us/faces-of-da-band/bruno.jpg'
import danielFace from '../../images/about-us/faces-of-da-band/danielw.jpg'
import dianaFace from '../../images/about-us/faces-of-da-band/diana.jpg'
import maxFace from '../../images/about-us/faces-of-da-band/max.jpg'
import patrickFace from '../../images/about-us/faces-of-da-band/patrick.jpg'
import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'
import tommasoFace from '../../images/about-us/faces-of-da-band/tommaso.jpg'
import wolfFace from '../../images/about-us/faces-of-da-band/wolfgang.jpg'

const Container = styled.div`
  width: 100%;
  margin: 60px 0;
  text-align: center;

  @media (min-width: 1000px) {
    margin: 120px 0 60px;
  }
`

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
`

const MainDescription = styled.div`
  color: #111;
  line-height: 1.2;
  width: 100%;
  font-size: 20px;
  margin: 20px auto 0;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 28px;
    text-align: center;
    width: 1040px;
  }
`

const FacesContainer = styled.div`
  display: none;
  flex-direction: column;
  margin-top: 140px;

  @media (min-width: 1000px) {
    display: flex;
  }
`

const FacesContainerMobile = styled.div`
  margin-top: 140px;

  @media (min-width: 1000px) {
    display: none;
  }
`

const FaceImage = styled.img`
  height: 115px;
  width: 115px;
  flex: 0 0 115px;
`

const FaceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & + & {
    margin-top: 30px;
  }

  @media (min-width: 1000px) {
    justify-content: center;
    flex-direction: column;
    width: 33%;
  }
`

const FaceText = styled.div`
  font-size: 16px;
  text-align: left;
  & + & {
    margin-top: 15px;
  }

  @media (min-width: 1000px) {
    text-align: center;

    & + & {
      margin-top: 5px;
    }
  }
`

const FaceTextContainer = styled.div`
  margin-left: 20px;
  @media (min-width: 1000px) {
    margin: 20px 0 0;
  }
`

const FaceCells = styled.div`
  @media (min-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`

const Face = ({ src, name, description }) => (
  <FaceContainer>
    <FaceImage src={src}></FaceImage>
    <FaceTextContainer>
      <FaceText>{name}</FaceText>
      <FaceText>{description}</FaceText>
    </FaceTextContainer>
  </FaceContainer>
)

const FacesOfDaBand = () => (
  <FacesContainer>
    <FaceCells>
      <Face description="Co-Founder & CEO" name="Wolfgang Schmidt-Ulm dos Santos" src={wolfFace}></Face>
      <Face description="Tech" name="Max Chuchmai" src={maxFace}></Face>
    </FaceCells>
    <FaceCells>
      <Face description="Co-Founder & Product" name="Daniel Welzel" src={danielFace}></Face>
      <Face description="Growth & Marketing" name="Tommaso Di Stefano" src={tommasoFace}></Face>
      <Face description="Influencer & Brand Mgmt." name="Diana Machado" src={dianaFace}></Face>
    </FaceCells>
    <FaceCells>
      <Face description="Marketing" name="Patrick Burkert" src={patrickFace}></Face>
      <Face description="Operations" name="Bruno Santos" src={brunoFace}></Face>
    </FaceCells>
  </FacesContainer>
)

const FacesOfDaMobile = () => (
  <FacesContainerMobile>
    <Face description="Co-Founder & CEO" name="Wolfgang Schmidt-Ulm dos Santos" src={wolfFace}></Face>
    <Face description="Tech" name="Max Chuchmai" src={maxFace}></Face>
    <Face description="Co-Founder & Product" name="Daniel Welzel" src={danielFace}></Face>
    <Face description="Growth & Marketing" name="Tommaso Di Stefano" src={tommasoFace}></Face>
    <Face description="Influencer & Brand Mgmt." name="Diana Machado" src={dianaFace}></Face>
    <Face description="Marketing" name="Patrick Burkert" src={patrickFace}></Face>
    <Face description="Operations" name="Bruno Santos" src={brunoFace}></Face>
  </FacesContainerMobile>
)

const MeetTheBand = () => (
  <Section>
    <Container>
      <HeaderText>{'Meet the band behind the music'}</HeaderText>
      <MainDescription>
        {
          'Our founders and leading talents come from some of the biggest names in the retail and startup industry such as Outfittery, Uniplaces and GoPopUp. We are dedicated to our mission, vision and values and work together to change the way how we consume for the better, forever.'
        }
      </MainDescription>
      <FacesOfDaBand />
      <FacesOfDaMobile />
    </Container>
  </Section>
)

export default MeetTheBand
