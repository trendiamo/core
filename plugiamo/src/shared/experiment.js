import datafile from 'optimizely.json'
import mixpanel from 'ext/mixpanel'
import optimizely from '@optimizely/optimizely-sdk'
import { cloneElement, h } from 'preact'
import { compose, withProps } from 'recompose'

const Experiment = ({ testChildren }) => <div>{testChildren}</div>

export default compose(
  withProps(() => ({
    optimizelyClientInstance: optimizely.createInstance({ datafile }),
  })),
  withProps(({ experimentName, optimizelyClientInstance }) => ({
    variation: optimizelyClientInstance.activate(experimentName, mixpanel.get_distinct_id()),
  })),
  withProps(({ children, variation, optimizelyClientInstance }) => ({
    testChildren: children.map(child => cloneElement(child, { variation, optimizelyClientInstance })),
  }))
)(Experiment)
