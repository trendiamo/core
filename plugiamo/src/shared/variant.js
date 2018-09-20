import { h } from 'preact'

const Variant = ({ children, variation, variantName }) => variation === variantName && <div>{children}</div>

export default Variant
