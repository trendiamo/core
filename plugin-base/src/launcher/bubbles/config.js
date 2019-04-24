// All time values are in seconds
const defaultBubble = {
  timeStart: 0.5,
  timeEnd: 20,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
  timeOfElevation: 1.6,
}

const defaultBubbleExtra = {
  timeStart: 2.5,
  timeEnd: 18.2,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
}

const defaultBubbleButtons = {
  buttonNo: {
    value: 'no',
    appearsAfter: 0,
  },
  buttonYes: {
    value: 'yes',
    appearsAfter: 0.2,
  },
  timeStart: 2.5,
  timeEnd: null,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
}

export { defaultBubble, defaultBubbleExtra, defaultBubbleButtons }
