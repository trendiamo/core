import AsyncSelect from 'react-select/lib/Async'
import debounce from 'debounce-promise'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

const StyledSelect = styled(AsyncSelect).attrs({
  singleValueColor: ({ shouldBlurText }) => (shouldBlurText ? '#77777f' : '#372727'),
})`
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
      cursor: text;
      border-width: 0px 0px 2px;
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
  withState('menuIsOpen', 'setMenuIsOpen', false),
  withState('shouldBlurText', 'setShouldBlurText', false),
  withHandlers(() => {
    let hasTyped = false
    return {
      onInputChange: ({ setMenuIsOpen, setShouldBlurText }) => (searchQuery, event) => {
        hasTyped = true
        setShouldBlurText(event.action === 'set-value')
        setMenuIsOpen(!(0 < searchQuery.length || searchQuery.length <= 2))
      },
      onMenuOpen: ({ setMenuIsOpen, setDefaultOptions, name, autocomplete, defaultOptions }) => async () => {
        if (hasTyped) {
          hasTyped = false
          return
        }
        setMenuIsOpen(true)
        if (0 < defaultOptions.length) return
        const rawOptions = await autocomplete('')
        const options = rawOptions.map(option => {
          return { value: option, label: option.name, name }
        })
        setDefaultOptions(options)
      },
      loadOptions: ({ name, setMenuIsOpen, debouncedAutocomplete }) => async searchQuery => {
        if (searchQuery.length <= 2) return setMenuIsOpen(false)
        setMenuIsOpen(true)
        const rawOptions = await debouncedAutocomplete({ searchQuery })
        const options = rawOptions.map(option => {
          return { value: option, label: option.name, name }
        })
        return options
      },
      onFocus: ({ setShouldBlurText }) => () => {
        setShouldBlurText(true)
      },
      onBlur: ({ setShouldBlurText }) => () => {
        setShouldBlurText(false)
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
    onBlur,
    onMenuOpen,
    menuIsOpen,
    onFocus,
    isDisabled,
    shouldBlurText,
  }) => (
    <StyledSelect
      cacheOptions
      classNamePrefix="react-select"
      defaultOptions={defaultOptions}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      loadOptions={loadOptions}
      menuIsOpen={menuIsOpen}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onInputChange={onInputChange}
      onMenuOpen={onMenuOpen}
      openMenuOnClick={false}
      placeholder={placeholder}
      shouldBlurText={shouldBlurText}
    />
  )
)

export default Select
