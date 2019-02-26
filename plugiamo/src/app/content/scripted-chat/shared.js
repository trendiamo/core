import styled from 'styled-components'

export const ChatBackground = styled.div`
  background-color: #ebeef2;
  padding: 1rem 1rem 0 1rem;
  flex: 1;
`

export const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

export const extractJson = message => {
  if (message[0] !== '{') return
  try {
    return JSON.parse(message)
  } catch (e) {
    return null
  }
}

export const isFrameActive = () => {
  return (
    document.activeElement &&
    document.activeElement.tagName.toLowerCase() === 'iframe' &&
    document.activeElement.title === 'Trendiamo Content'
  )
}

export const convertLogs = logs => {
  let newLog = []
  let currentList = []
  logs.map((log, index) => {
    const nextLog = logs[index + 1]
    currentList.push(log)
    if (nextLog) {
      if (nextLog.type !== log.type) {
        newLog.push({ ...log, logs: currentList })
        currentList = []
      }
      return
    }
    newLog.push({ ...log, logs: currentList })
  })
  return newLog
}

export const MESSAGE_INTERVAL = 320
export const MESSAGE_RANDOMIZER = 320
