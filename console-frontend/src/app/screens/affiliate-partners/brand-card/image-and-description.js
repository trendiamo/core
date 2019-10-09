import React from 'react'
import styled from 'styled-components'
import { Chip, Typography } from '@material-ui/core'

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  flex-shrink: 0;
  cursor: pointer;
  margin: 0 0 20px 0;
  @media (min-width: 960px) {
    width: 150px;
    height: 100%;
    margin: 0 20px 0 0;
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  @media (min-width: 960px) {
    max-height: 140px;
  }
`

const Tags = styled.div`
  min-width: 100px;
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  * + & {
    margin-top: 2px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
  }
`

const ShippingTo = styled(Typography)`
  margin-right: 8px;
  line-height: 32px;
`

const Tag = styled(Chip)`
  background-color: #8799a4;
  border-radius: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  height: 22px;
  text-transform: uppercase;
  flex: 0;
  span {
    padding-left: 8px;
    padding-right: 8px;
  }
  margin: 4px;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 13px;
  @media (min-width: 960px) {
    margin-top: 8px;
  }
`

const Description = ({ brand }) => (
  <div>
    <Typography variant="body2">
      <b>{brand.name}</b>
    </Typography>
    <Typography variant="body2">{brand.description}</Typography>
    <TagsContainer>
      <ShippingTo variant="subtitle1">{'Available in:'}</ShippingTo>
      <Tags>
        {brand.tags.split(',').map(tag => (
          <Tag key={tag} label={tag} size="small" />
        ))}
      </Tags>
    </TagsContainer>
  </div>
)

const ImageAndDescription = ({ brand, onClickBrandLogo }) => (
  <Container>
    <ImageContainer onClick={onClickBrandLogo}>
      <Image src={brand.logoUrl} />
    </ImageContainer>
    <Description brand={brand} />
  </Container>
)

export default ImageAndDescription
