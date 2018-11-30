import Experiment from 'shared/experiment'
import OriginalLauncher from './original'
import PulsatingLauncher from './pulsating'
import Variant from 'shared/variant'
import { h } from 'preact'
import { production } from 'config'

const ExperimentLauncher = ({ ...props }) => (
  <Experiment experimentName="PulsatingLauncher">
    <Variant variantName="original">
      <OriginalLauncher {...props} />
    </Variant>
    <Variant variantName="pulsating">
      <PulsatingLauncher {...props} />
    </Variant>
  </Experiment>
)

const Launcher = production ? ExperimentLauncher : OriginalLauncher

export default Launcher
