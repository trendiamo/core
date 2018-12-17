import { initialSteps, personaCreated } from './steps'

const stages = {
  initial: { defaultRun: true, steps: initialSteps },
  persona: { defaultRun: false, steps: personaCreated },
}

export default [stages.initial, stages.persona]
