import AsyncSelect from 'react-select/lib/Async'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const StyledSelect = styled(AsyncSelect)`
  font-family: 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
  .react-select__control {
    color: #372727;
    padding: 0px;
    border-width: 0px 0px 1px;
    border-radius: 0px;
    border-color: #949494;
    margin-top: 15px;
    box-shadow: none;
    &: hover {
      border-color: #212121;
      border-width: 0px 0px 2px;
      .react-select__indicator {
        color: #212121;
      }
    }
  }
  .react-select__value-container {
    padding: 0px;
  }
  .react-select__option {
    color: #77777f;
  }
  .react-select__option--is-selected {
    background-color: #f2f4f7;
  }
  .react-select__option--is-focused {
    background-color: #deebff;
  }
  .react-select__placeholder {
    color: #77777f;
  }
  .react-select__single-value {
    color: #372727;
  }
  #react-select-2-input {
    font-family: 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
    color: #372727;
  }
  #react-select-3-input {
    font-family: 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
    color: #372727;
  }
`

const Select = compose(
  withHandlers({
    loadOptions: ({ autocomplete, name }) => async searchQuery => {
      if (searchQuery.length <= 2) return
      const rawOptions = await autocomplete({ searchQuery })
      const options = rawOptions.map(option => {
        return { value: option, label: option.name, name }
      })
      return options
    },
  })
)(({ placeholder, loadOptions, onChange, defaultValue }) => (
  <StyledSelect
    cacheOptions
    classNamePrefix="react-select"
    defaultOptions
    defaultValue={defaultValue}
    loadOptions={loadOptions}
    onChange={onChange}
    placeholder={placeholder}
  />
))

export default Select
