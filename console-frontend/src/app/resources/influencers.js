import Avatar from '@material-ui/core/Avatar'
import { Field } from 'redux-form'
import React from 'react'
import styled from 'styled-components'
import UploadPicture from 'shared/picture-uploader'
import { compose, withHandlers, withState } from 'recompose'
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Responsive,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

const StyledAvatar = styled(Avatar)`
  width: ${({ small }) => (small ? '40px' : '100px')};
  height: ${({ small }) => (small ? '40px' : '100px')};
`
const ProfilePic = ({ record, small }) => <StyledAvatar alt={record.name} small={small} src={record.profilePicUrl} />

const Label = styled.label`
  display: block;
  color: #222;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin-bottom: 0.5rem;
`

const FieldPic = compose(
  withState('picValue', 'setPicValue', ({ input }) => input.value),
  withHandlers({
    setPicture: ({ input, setPicValue }) => value => {
      setPicValue(value)
      input.onChange(value)
    },
  })
)(({ picValue, setPicture }) => (
  <React.Fragment>
    <Label>{'Picture'}</Label>
    <UploadPicture onChange={setPicture} value={picValue} />
  </React.Fragment>
))

const ProfilePicInput = ({ source }) => <Field component={FieldPic} label="picture" name={source} />

export const InfluencersEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Influencer">
    <SimpleForm>
      <ProfilePicInput source="profilePicUrl" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
)

export const InfluencerShow = props => (
  <Show {...props} title="Influencer">
    <SimpleShowLayout>
      <ProfilePic />
      <TextField source="name" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
)

export const InfluencersList = ({ ...props }) => (
  <List {...props} title="Influencers">
    <Responsive
      medium={
        <Datagrid>
          <ProfilePic small />
          <TextField source="name" />
          <TextField source="description" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
      small={
        <SimpleList
          primaryText={record => record.id}
          secondaryText={record => record.description}
          tertiaryText={record => record.status}
        />
      }
    />
  </List>
)

export const InfluencersCreate = ({ ...props }) => (
  <Create {...props} title="Create Influencer">
    <SimpleForm redirect="show">
      <ProfilePicInput source="profilePicUrl" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
