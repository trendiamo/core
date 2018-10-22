import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import React from 'react'
import { EditButton, ReferenceField, TextField } from 'react-admin'

const cardStyle = {
  display: 'inline-block',
  margin: '0.5em',
  minHeight: 300,
  verticalAlign: 'top',
  width: 300,
}
const CardDisplay = ({ ids, data, basePath }) => (
  <div style={{ margin: '1em' }}>
    {ids.map(id => (
      <Card key={id} style={cardStyle}>
        <CardHeader title={<TextField record={data[id]} source="author.name" />} />
        <CardContent>
          <TextField record={data[id]} source="body" />
        </CardContent>
        <CardContent>
          {'about&nbsp'}
          <ReferenceField
            basePath={basePath}
            label="Post"
            record={data[id]}
            reference="posts"
            resource="comments"
            source="post_id"
          >
            <TextField source="title" />
          </ReferenceField>
        </CardContent>
        <CardActions style={{ textAlign: 'right' }}>
          <EditButton basePath={basePath} record={data[id]} resource="posts" />
        </CardActions>
      </Card>
    ))}
  </div>
)
CardDisplay.defaultProps = {
  data: {},
  ids: [],
}

// export const CommentList = props => (
//   <List title="All comments" {...props}>
//     <CardDisplay />
//   </List>
// )

export default CardDisplay
