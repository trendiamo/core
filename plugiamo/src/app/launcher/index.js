import Experiment from 'shared/experiment'
import OriginalLauncher from './original'
import PulsatingLauncher from './pulsating'
import Variant from 'shared/variant'
import { h } from 'preact'

const Launcher = ({ ...props }) => (
  <Experiment experimentName="PulsatingLauncher">
    <Variant variantName="original">
      <OriginalLauncher {...props} />
    </Variant>
    <Variant variantName="pulsating">
      <PulsatingLauncher {...props} />
    </Variant>
  </Experiment>
)

export default Launcher
