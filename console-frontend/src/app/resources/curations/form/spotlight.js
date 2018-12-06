import ProductPick from './product-pick'
import React from 'react'
import styled from 'styled-components'
import { AddItemButton, Cancel, Section } from 'shared/form-elements'
import {
  Avatar,
  FormControl,
  Grid,
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
    <Grid item sm={6}>
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
    </Grid>
    <div style={{ marginTop: '24px' }}>
      {form.spotlightsAttributes[index].productPicksAttributes.map((productPick, productPickIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={productPickIndex}>
          <Section
            actions={
              form.spotlightsAttributes[index].productPicksAttributes.length > 1 && (
                <Cancel disabled={isFormLoading} index={productPickIndex} onClick={deleteProductPick} />
              )
            }
            foldable
            title="Spotlight Product Picks"
          >
            <div>
              <Typography variant="subtitle1">{`Product Pick #${productPickIndex + 1}`}</Typography>
              <ProductPick
                form={form.spotlightsAttributes[index]}
                index={productPickIndex}
                onChange={editProductPickValue}
              />
            </div>
          </Section>
        </div>
      ))}
    </div>
    <AddItemButton disabled={isFormLoading} index={index} message="Add Another Product Pick" onClick={addProductPick} />{' '}
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
    deleteProductPick: ({ index, form, setForm }) => productPickIndex => {
      let newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks.splice(productPickIndex, 1)
      form.spotlightsAttributes[index].productPicksAttributes = newProductPicks
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
