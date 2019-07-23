import debounce from 'debounce-promise'
import Downshift from 'downshift'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { apiRequest } from 'utils'
import { ArrowDropDown } from '@material-ui/icons'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Paper } from '@material-ui/core'
import { suggestionTypes } from 'shared/autocomplete-options'

const StyledArrowDropDown = styled(ArrowDropDown)`
  &:hover {
    cursor: pointer;
  }
`

const DropdownButton = ({ onClick }) => (
  <InputAdornment position="end">
    <StyledArrowDropDown onClick={onClick} />
  </InputAdornment>
)

const AutocompleteInput = ({ formControlProps, loadAllOptions, inputProps, label, name }) => {
  const inputRef = useRef(null)

  const onDropdownClick = useCallback(
    () => {
      loadAllOptions()
      const ref = inputRef.current
      if (ref) ref.focus()
    },
    [loadAllOptions]
  )

  return (
    <FormControl margin="normal" {...formControlProps}>
      <InputLabel htmlFor={inputProps.id} id={inputProps['aria-labelledby']}>
        {label}
      </InputLabel>
      <Input
        endAdornment={<DropdownButton onClick={onDropdownClick} />}
        fullWidth
        inputProps={{ ref: inputRef }}
        name={name}
        type="text"
        {...inputProps}
      />
    </FormControl>
  )
}

const ResultsDiv = styled.div`
  width: 100%;
  position: absolute;
`

const StyledPaper = styled(Paper)`
  position: relative;
  max-height: 300px;
  overflow-y: auto;
  z-index: 2;
`

const StyledMenuItem = styled(MenuItem)`
  overflow: hidden;
  padding: ${({ options }) => (options.suggestionItem === 'withAvatar' ? '20px 10px 20px 10px' : 'auto')};
`

const AutocompleteSuggestion = ({ suggestion, index, itemProps, highlightedIndex, options }) => (
  <StyledMenuItem
    options={options}
    {...itemProps}
    component="div"
    key={suggestion.label}
    selected={highlightedIndex === index}
  >
    {options ? suggestionTypes(options.suggestionItem, { suggestion }) : suggestion.label}
  </StyledMenuItem>
)

const itemToString = selected => (selected ? selected.label : '')

const Autocomplete = ({
  autocomplete,
  disabled,
  label,
  required,
  fullWidth,
  initialValueFormatMismatch,
  name,
  defaultPlaceholder,
  onChange,
  options,
  initialSelectedItem,
  onFocus,
}) => {
  const debouncedAutocomplete = debounce(searchQuery => {
    return apiRequest(autocomplete, [{ searchQuery }])
  }, 250)

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [prevSelected, setPrevSelected] = useState(null)

  const loadAllOptions = useCallback(
    async () => {
      const { json } = await apiRequest(autocomplete, [''])
      const suggestions = json.map(option => {
        return { value: option, label: option.name }
      })
      setMenuIsOpen(!menuIsOpen)
      setSuggestions(suggestions)
    },
    [autocomplete, menuIsOpen]
  )

  const handleSelect = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen])
  const handleOuterClick = useCallback(() => setMenuIsOpen(false), [setMenuIsOpen])

  const onInputValueChange = useCallback(
    async (searchQuery, stateAndHelpers) => {
      if (searchQuery.length <= 2) return setMenuIsOpen(false)
      const { json } = await debouncedAutocomplete(searchQuery)
      const options = json.map(option => {
        return { value: option, label: option.name }
      })
      if (
        initialValueFormatMismatch ||
        !prevSelected ||
        prevSelected.value.name.toLowerCase() !== searchQuery.toLowerCase()
      ) {
        setSuggestions(options)
      }
      if (stateAndHelpers.type === '__autocomplete_change_input__') {
        setMenuIsOpen(true)
      }
    },
    [debouncedAutocomplete, initialValueFormatMismatch, prevSelected]
  )

  useEffect(
    () => {
      setPrevSelected(initialSelectedItem)
    },
    [setPrevSelected, initialSelectedItem]
  )

  return (
    <Downshift
      initialSelectedItem={initialSelectedItem}
      isOpen={menuIsOpen}
      itemToString={itemToString}
      onChange={onChange}
      onInputValueChange={onInputValueChange}
      onOuterClick={handleOuterClick}
      onSelect={handleSelect}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        isOpen,
        clearSelection,
        selectItem,
      }) => (
        <div style={{ width: '100%', position: 'relative' }}>
          <AutocompleteInput
            formControlProps={{ disabled, required, fullWidth }}
            inputProps={getInputProps({
              placeholder: prevSelected ? prevSelected.label : defaultPlaceholder,
              onFocus: () => {
                clearSelection()
                selectedItem && setPrevSelected(selectedItem)
                onFocus && onFocus()
              },
              onBlur: () => {
                if (selectedItem === null) selectItem(prevSelected)
              },
            })}
            label={label}
            loadAllOptions={loadAllOptions}
            name={name}
          />
          <ResultsDiv {...getMenuProps()}>
            {isOpen ? (
              <StyledPaper square>
                {suggestions.map((suggestion, index) => (
                  <AutocompleteSuggestion
                    highlightedIndex={highlightedIndex}
                    index={index}
                    itemProps={getItemProps({ item: suggestion })}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    options={options}
                    selectedItem={selectedItem}
                    suggestion={suggestion}
                  />
                ))}
              </StyledPaper>
            ) : null}
          </ResultsDiv>
        </div>
      )}
    </Downshift>
  )
}

export default memo(Autocomplete)
