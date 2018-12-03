import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Cancel from './shared/cancel'
import ProductPick from './product-pick'
import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { compose, withHandlers } from 'recompose'

const StyledAvatar = styled(Avatar)`
  display: inline-block;
`

const StyledTypography = styled(Typography)`
  display: inline-block;
  margin-left: 20px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddProductPickButton = ({ disabled, addProductPick }) => (
  <Button disabled={disabled} onClick={addProductPick} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Product Pick'}</StyledTypography>
  </Button>
)

const Spotlight = ({
  personas,
  addProductPick,
  index,
  deleteProductPick,
  form,
  editProductPickValue,
  isFormLoading,
  editSpotlightValue,
}) => (
  <React.Fragment>
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Spotlight Text"
      margin="normal"
      name="text"
      onChange={editSpotlightValue}
      required
      value={form.spotlightsAttributes[index].text}
    />
    <FormControl disabled={isFormLoading} fullWidth>
      <InputLabel htmlFor="persona-label-placeholder" shrink>
        {'Persona'}
      </InputLabel>
      <Select
        displayEmpty
        input={<Input id="persona-label-placeholder" name="persona" />}
        name="personaId"
        onChange={editSpotlightValue}
        value={form.spotlightsAttributes[index].personaId}
      >
        {personas.map(persona => (
          <MenuItem key={`persona-${persona.id}`} value={persona.id}>
            <Item>
              <StyledAvatar alt={persona.name} src={persona.profilePicUrl} />
              <StyledTypography>{persona.name}</StyledTypography>
            </Item>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Typography variant="subtitle1">{'Spotlight Product Picks'}</Typography>
    <div>
      {form.spotlightsAttributes[index].productPicksAttributes.map((productPick, productPickIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={productPickIndex}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">{`Product Pick ${productPickIndex}`}</Typography>
              <ProductPick
                form={form.spotlightsAttributes[index]}
                index={productPickIndex}
                onChange={editProductPickValue}
              />
              {form.spotlightsAttributes[index].productPicksAttributes.length > 1 && (
                <IconButton>
                  <Cancel disabled={isFormLoading} index={productPickIndex} onClick={deleteProductPick} />
                </IconButton>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
      <AddProductPickButton addProductPick={addProductPick} disabled={isFormLoading} index={index} />{' '}
    </div>
  </React.Fragment>
)

export default compose(
  withHandlers({
    editSpotlightValue: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
    addProductPick: ({ form, index, setForm }) => () => {
      const newProductPicks = [
        ...form.spotlightsAttributes[index].productPicksAttributes,
        {
          url: '',
          name: '',
          description: '',
          displayPrice: '',
          picUrl: '',
        },
      ]
      form.spotlightsAttributes[index].productPicksAttributes = newProductPicks
      setForm(form)
    },
    deleteProductPick: ({ index, form, setForm }) => () => {
      let newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks.splice(index, 1)
      form.spotlightsAttributes[index].productPicksAttributes = newProductPicks.splice(index, 1)
      setForm(form)
    },
  }),
  withHandlers({
    editProductPickValue: ({ setForm, index, form }) => (productPickIndex, newValue) => {
      const newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks[productPickIndex][newValue.name] = newValue.value
      setForm({ ...form, productPicksAttributes: newProductPicks })
    },
  })
)(Spotlight)
