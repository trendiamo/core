import Arrow from 'shared/arrow'
import styled from 'styled-components'
import Welcome from './welcome'
import { action } from '@storybook/addon-actions'
import { Basics, CoverFixedPositionLogic, PulsatingEffect } from './layout'
import { Card, CardContent, CardImg, CardsContainer, CardsWrapper } from 'shared/card'
import { Showcase, Navigation, Outro, ScriptedChat } from './flows'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronLeft, IconChevronRight, IconClose } from 'icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { storiesOf } from '@storybook/react'
import { Tile, TilesWrapper } from 'shared/tiles'
import './styles.css'

const PluginContainer = styled.div`
  height: 500px;
  width: 360px;
  padding: 1rem;
  background-color: #ebeef2;
`

storiesOf('Welcome', module).add('README', Welcome)

storiesOf('Layout', module)
  .add('Basics', Basics)
  .add('Cover fixed position logic', CoverFixedPositionLogic)
  .add('Pulsating Launcher', PulsatingEffect)

storiesOf('Flows', module)
  .add('Showcase', Showcase)
  .add('Navigation', Navigation)
  .add('Scripted Chat', ScriptedChat)
  .add('Outro', Outro)

storiesOf('Basic Components', module)
  .add('Arrow', () => <Arrow />)
  .add('Cards', () => (
    <PluginContainer>
      <CardsWrapper>
        <CardsContainer>
          <Card style={{ width: '100px' }}>
            <CardImg src="https://placeimg.com/200/200/any?1" />
            <CardContent>{'Buy this'}</CardContent>
          </Card>
          <Card style={{ width: '100px' }}>
            <CardImg src="https://placeimg.com/200/200/any?2" />
            <CardContent>{'Buy that'}</CardContent>
          </Card>
          <Card style={{ width: '100px' }}>
            <CardImg src="https://placeimg.com/200/200/any?3" />
            <CardContent>{'Buy the bear'}</CardContent>
          </Card>
          <Card style={{ width: '100px' }}>
            <CardImg src="https://placeimg.com/200/200/any?4" />
            <CardContent>{'Buy the other bear'}</CardContent>
          </Card>
        </CardsContainer>
      </CardsWrapper>
    </PluginContainer>
  ))
  .add('List', () => (
    <PluginContainer>
      <List>
        <ListItem onClick={action('clicked-list-item')}>
          <ListImg src="https://placeimg.com/200/200/any?1" />
          <ListContent>{'Buy this'}</ListContent>
          <ListChevron />
        </ListItem>
        <ListItem onClick={action('clicked-list-item')}>
          <ListImg src="https://placeimg.com/200/200/any?2" />
          <ListContent>{'Buy that'}</ListContent>
          <ListChevron />
        </ListItem>
      </List>
    </PluginContainer>
  ))
  // .add('Tiles w/ icon', () => (
  //   <PluginContainer>
  //     <TilesWrapper>
  //       <Tile Icon={IconSchool} title="Study" />
  //       <Tile Icon={IconPortfolio} title="Work" />
  //       <Tile Icon={IconFamily} title="Family" />
  //       <Tile Icon={IconTree} title="Leisure" />
  //     </TilesWrapper>
  //   </PluginContainer>
  // ))
  .add('Tiles', () => (
    <PluginContainer>
      <TilesWrapper>
        <Tile imageUrl="https://placeimg.com/300/300/arch?1" title="Lisbon" />
        <Tile imageUrl="https://placeimg.com/300/300/arch?2" title="Barcelona" />
        <Tile imageUrl="https://placeimg.com/300/300/arch?3" title="Madrid" />
        <Tile imageUrl="https://placeimg.com/300/300/arch?4" title="Berlin" />
      </TilesWrapper>
    </PluginContainer>
  ))

storiesOf('Icons', module)
  .add('close', () => <IconClose style={{ height: 24, width: 24 }} />)
  .add('chevron left', () => <IconChevronLeft style={{ height: 24, width: 24 }} />)
  .add('chevron right', () => <IconChevronRight style={{ height: 24, width: 24 }} />)
  .add('animated ellipisis', () => <IconAnimatedEllipsis style={{ height: 24, width: 24 }} />)
