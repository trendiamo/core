import ModalUrlGenerator from './modal-url-generator'
import React from 'react'
import Section from 'shared/section'
import UrlGeneratorForm from './form'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { compose, withState } from 'recompose'
import { Grid } from '@material-ui/core'

const UrlGenerator = ({ setGeneratedUrl, isModalOpened, setIsModalOpened, generatedUrl }) => (
  <React.Fragment>
    <ModalUrlGenerator open={isModalOpened} setOpen={setIsModalOpened} url={generatedUrl} />
    <Section>
      <Grid alignItems="center" container justify="center">
        <Grid item sm={5}>
          <UrlGeneratorForm setGeneratedUrl={setGeneratedUrl} setIsModalOpened={setIsModalOpened} />
        </Grid>
      </Grid>
    </Section>
  </React.Fragment>
)

export default compose(
  withState('generatedUrl', 'setGeneratedUrl', ''),
  withState('isModalOpened', 'setIsModalOpened', false),
  withAppBarContent({ breadcrumbs: [{ text: 'Url Generator' }] })
)(UrlGenerator)
