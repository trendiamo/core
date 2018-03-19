import moment from 'moment'
import React from 'react'
import { compose, withProps } from 'recompose'

const Comment = ({ content, createdAt, username }) => (
  <li>
    <b style={{ marginRight: '0.3rem' }}>{username}</b>
    <span>{content}</span>
    <p>{createdAt}</p>
  </li>
)

export default compose(
  withProps(({ comment }) => ({
    content: comment.content,
    createdAt: moment(comment.createdAt).fromNow(),
    username: comment.user.username,
  }))
)(Comment)
