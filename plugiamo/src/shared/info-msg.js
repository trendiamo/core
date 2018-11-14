// the higher order function is useful in recompose's branch, for example.
const infoMsgHof = string => () => console && console.info(`%c Trendiamo: ${string}`, 'color: #7189cf')

const infoMsg = string => infoMsgHof(string)()

export { infoMsg, infoMsgHof }
