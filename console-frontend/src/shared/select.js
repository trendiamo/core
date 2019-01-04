import AsyncSelect from 'react-select/lib/Async'
import debounce from 'debounce-promise'
import React from 'react'
import styled from 'styled-components'
import { apiRequest } from 'utils'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { FormControl, InputLabel } from '@material-ui/core'

const StyledSelect = styled(AsyncSelect).attrs({
  singleValueColor: ({ isFocussed }) => (isFocussed ? '#77777f' : '#372727'),
})`
  font-family: 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
  .react-select__control {
    color: #372727;
    padding: 0px;
    margin-top: 15px;
    box-shadow: none;
    border: none;
    border-radius: 0;
    cursor: text;
    &:before {
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      position: absolute;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      pointer-events: none;
    }
    &:not(.react-select__control--is-focused):hover:before {
      border-bottom: 2px solid rgba(0, 0, 0, 0.87);
    }
    &:after {
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      position: absolute;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      border-bottom: 2px solid rgb(3, 67, 178);
      pointer-events: none;
    }
  }
  .react-select__control--is-focused {
    &:after {
      transform: scaleX(1);
    }
  }

  .react-select__value-container {
    padding: 0px;
  }
  .react-select__indicator {
    &: hover {
      color: #212121;
      cursor: pointer;
    }
  }
  .react-select__option--is-selected {
    background-color: #f2f4f7;
    color: #2f2f27;
  }
  .react-select__option--is-focused {
    background-color: #deebff;
  }
  .react-select__placeholder {
    color: #77777f;
  }
  .react-select__single-value {
    color: ${({ singleValueColor }) => singleValueColor};
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
  withProps(({ autocomplete }) => ({
    debouncedAutocomplete: debounce(autocomplete, 250),
  })),
  withState('defaultOptions', 'setDefaultOptions', []),
  withState('isMenuOpen', 'setIsMenuOpen', false),
  withState('isFocussed', 'setIsFocussed', false),
  withHandlers(() => {
    let skipMenuOpen = false
    let hasBlurred = false
    return {
      onInputChange: ({ setIsFocussed, setIsMenuOpen }) => (searchQuery, event) => {
        skipMenuOpen = event.action === 'menu-close' ? false : !hasBlurred || searchQuery.length === 0
        if (event.action === 'menu-close') {
          setIsMenuOpen(false)
          setIsFocussed(false)
        }
      },
      onMenuOpen: ({
        setIsFocussed,
        setIsMenuOpen,
        setDefaultOptions,
        name,
        autocomplete,
        defaultOptions,
      }) => async () => {
        if (skipMenuOpen) {
          skipMenuOpen = false
          return
        }
        setIsMenuOpen(true)
        setIsFocussed(true)
        if (defaultOptions.length > 0) return
        const { json } = await apiRequest(autocomplete, [''])
        const options = json.map(option => {
          return { value: option, label: option.name, name }
        })
        setDefaultOptions(options)
      },
      loadOptions: ({ name, setIsMenuOpen, debouncedAutocomplete }) => async searchQuery => {
        if (searchQuery.length <= 2) return setIsMenuOpen(false)
        setIsMenuOpen(true)
        const { json } = await apiRequest(debouncedAutocomplete, [{ searchQuery }])
        const options = json.map(option => {
          return { value: option, label: option.name, name }
        })
        return options
      },
      onFocus: ({ setIsFocussed }) => () => setIsFocussed(true),
      onBlur: ({ setIsFocussed, setIsMenuOpen }) => () => {
        hasBlurred = true
        setIsMenuOpen(false)
        setIsFocussed(false)
      },
    }
  })
)(
  ({
    placeholder,
    loadOptions,
    onChange,
    defaultValue,
    onInputChange,
    defaultOptions,
    label,
    onBlur,
    onMenuOpen,
    isMenuOpen,
    onFocus,
    disabled,
    required,
    isFocussed,
  }) => (
    <FormControl disabled={disabled} fullWidth margin="normal">
      <InputLabel shrink>{`${label}${required ? ' *' : ''}`}</InputLabel>
      <StyledSelect
        cacheOptions
        classNamePrefix="react-select"
        defaultOptions={defaultOptions}
        defaultValue={defaultValue}
        isDisabled={disabled}
        isFocussed={isFocussed}
        loadOptions={loadOptions}
        menuIsOpen={isMenuOpen}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onInputChange={onInputChange}
        onMenuOpen={onMenuOpen}
        openMenuOnClick={false}
        placeholder={placeholder}
      />
    </FormControl>
  )
)

export default Select
