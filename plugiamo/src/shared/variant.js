import { cloneElement, h } from 'preact'

const Variant = ({ children, variation, variantName, optimizelyClientInstance }) =>
  variation === variantName && <div>{cloneElement(children[0], { optimizelyClientInstance })}</div>

export default Variant
