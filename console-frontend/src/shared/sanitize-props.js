const sanitizeProps = (props, propsToRemove) => {
  const newProps = { ...props }
  for (const key in propsToRemove) {
    delete newProps[propsToRemove[key]]
  }
  return newProps
}

export default sanitizeProps
