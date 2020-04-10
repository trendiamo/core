import anaFace from '../../images/about-us/faces-of-da-band/ana.jpg'
import brunoFace from '../../images/about-us/faces-of-da-band/bruno.jpg'
import danielFace from '../../images/about-us/faces-of-da-band/danielw.jpg'
import dianaFace from '../../images/about-us/faces-of-da-band/diana.jpg'
import diogoFace from '../../images/about-us/faces-of-da-band/diogo.jpg'
import maxFace from '../../images/about-us/faces-of-da-band/max.jpg'
import nidhiFace from '../../images/about-us/faces-of-da-band/nidhi.jpg'
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
  text-align: center;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
`

const MainDescription = styled.div`
  p {
    color: #111;
    line-height: 1.36;
    width: 100%;
    font-size: 22px;
    margin: 35px auto 0;
    text-align: left;
  }

  @media (min-width: 1000px) {
    p {
      font-size: 22px;
      text-align: center;
      width: 1020px;
    }
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

    & + & {
      margin-top: 0;
    }
  }
`

const FaceText = styled.div`
  font-size: 16px;
  text-align: left;
  line-height: 1.4;
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

const FaceImageContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 115px;
  height: 115px;

  max-width: 115px;
  max-height: 115px;
`

const Face = ({ src, name, description }) => (
  <FaceContainer>
    <FaceImageContainer>
      <FaceImage src={src}></FaceImage>
    </FaceImageContainer>
    <FaceTextContainer>
      <FaceText>{name}</FaceText>
      <FaceText>{description}</FaceText>
    </FaceTextContainer>
  </FaceContainer>
)

const FacesOfDaBand = ({ data }) => (
  <FacesContainer>
    <FaceCells>
      <Face
        description={data.aboutUs.theBandMembers.wolf.description}
        name="Wolfgang Schmidt-Ulm dos Santos"
        src={wolfFace}
      ></Face>
      <Face description={data.aboutUs.theBandMembers.daniel.description} name="Daniel Welzel" src={danielFace}></Face>
    </FaceCells>
    <br />
    <br />
    <FaceCells>
      <Face
        description={data.aboutUs.theBandMembers.ana.description}
        name="Ana Vitória De Magalhães"
        src={anaFace}
      ></Face>
      <Face description={data.aboutUs.theBandMembers.bruno.description} name="Bruno Santos" src={brunoFace}></Face>
    </FaceCells>
  </FacesContainer>
)

const FacesOfDaMobile = ({ data }) => (
  <FacesContainerMobile>
    <Face
      description={data.aboutUs.theBandMembers.wolf.description}
      name="Wolfgang Schmidt-Ulm dos Santos"
      src={wolfFace}
    ></Face>
    <Face description={data.aboutUs.theBandMembers.daniel.description} name="Daniel Welzel" src={danielFace}></Face>
    <Face
      description={data.aboutUs.theBandMembers.ana.description}
      name="Ana Vitória De Magalhães"
      src={anaFace}
    ></Face>
    <Face description={data.aboutUs.theBandMembers.bruno.description} name="Bruno Santos" src={brunoFace}></Face>
  </FacesContainerMobile>
)

const MeetTheBand = ({ data }) => (
  <Section>
    <Container>
      <HeaderText>{data.aboutUs.theBandHeading}</HeaderText>
      <FacesOfDaBand data={data} />
      <FacesOfDaMobile data={data} />
    </Container>
  </Section>
)

export default MeetTheBand
