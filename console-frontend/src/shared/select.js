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
`

const Select = compose(
  withHandlers({
    loadOptions: ({ autocomplete, name }) => async searchQuery => {
      const rawOptions = await autocomplete({ searchQuery })
      const options = rawOptions.map(option => {
        return { value: option, label: option.name, name }
      })
      return options
    },
    loadAllOptions: ({ setOptions, list, name }) => async searchQuery => {
      const rawOptions = await list({ searchQuery })
      const options = rawOptions.map(option => {
        return { value: option, label: option.name, name }
      })
      setOptions(options)
    },
  }),
  withHandlers({
    handleLoadAllOptions: ({ loadAllOptions }) => searchQuery => {
      loadAllOptions(searchQuery)
    },
  })
)(({ onChange, options, handleLoadAllOptions, placeholder, defaultOptions, loadOptions }) => (
  <StyledSelect
    cacheOptions
    classNamePrefix="react-select"
    defaultOptions={defaultOptions}
    loadOptions={loadOptions}
    menuPlacement="auto"
    onChange={onChange}
    onMenuOpen={handleLoadAllOptions}
    options={options}
    placeholder={placeholder}
  />
))

export default Select
