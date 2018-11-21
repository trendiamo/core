/* eslint-disable local-rules/no-relative-parent-imports */
import OutroComp from 'app/content/outro'
import Plugin from '../plugin'
import { h } from 'preact'

const Outro = () => <Plugin Component={<OutroComp />} />

export default Outro
