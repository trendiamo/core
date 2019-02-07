import Experiment from 'shared/experiment'
import OriginalLauncher from './original'
import PulsatingLauncher from './pulsating'
import Variant from 'shared/variant'
import { h } from 'preact'

export const ExperimentLauncher = ({ ...props }) => (
  <Experiment experimentName="PulsatingLauncher">
    <Variant variantName="original">
      <OriginalLauncher {...props} />
    </Variant>
    <Variant variantName="pulsating">
      <PulsatingLauncher {...props} />
    </Variant>
  </Experiment>
)

const Launcher = ({ launcherType, ...props }) =>
  launcherType === 'original' ? <OriginalLauncher {...props} /> : <PulsatingLauncher {...props} />

export default Launcher
