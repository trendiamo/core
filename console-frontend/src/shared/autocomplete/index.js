import AddSellerModal from './add-seller-modal'
import debounce from 'debounce-promise'
import Downshift from 'downshift'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { apiRequest } from 'utils'
import { ArrowDropDown, PersonAdd } from '@material-ui/icons'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Paper, Tooltip } from '@material-ui/core'
import { suggestionTypes } from './options'

const StyledArrowDropDown = styled(ArrowDropDown)`
  &:hover {
    cursor: pointer;
  }
`

const StyledPersonAdd = styled(PersonAdd)`
  &:hover {
    cursor: pointer;
  }
`

const DropdownButton = ({ onClick }) => (
  <InputAdornment position="end">
    <StyledArrowDropDown onClick={onClick} />
  </InputAdornment>
)

const AddSellerButton = ({ onClick }) => (
  <Tooltip placement="top" title="Add a new seller">
    <InputAdornment position="end">
      <StyledPersonAdd onClick={onClick} />
    </InputAdornment>
  </Tooltip>
)

const AutocompleteInput = ({
  autoFocus,
  disabled,
  formControlProps,
  loadAllOptions,
  inputProps,
  label,
  name,
  setIsModalOpen,
}) => {
  const inputRef = useRef(null)
  const [hasFocused, setHasFocused] = useState(false)

  useEffect(
    () => {
      if (!autoFocus || hasFocused || disabled) return
      setHasFocused(true)
      inputRef.current.focus()
    },
    [autoFocus, disabled, hasFocused]
  )

  const onDropdownClick = useCallback(
    () => {
      loadAllOptions()
      const ref = inputRef.current
      if (ref) ref.focus()
    },
    [loadAllOptions]
  )

  const onAddSellerClick = useCallback(() => setIsModalOpen(true), [setIsModalOpen])

  return (
    <FormControl margin="normal" {...formControlProps}>
      <InputLabel htmlFor={inputProps.id} id={inputProps['aria-labelledby']}>
        {label}
      </InputLabel>
      <Input
        disabled={disabled}
        endAdornment={
          <>
            <DropdownButton onClick={onDropdownClick} />
            {name === 'Seller' && <AddSellerButton onClick={onAddSellerClick} />}
          </>
        }
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
  autoFocus,
  defaultPlaceholder,
  disabled,
  fullWidth,
  initialSelectedItem,
  initialValueFormatMismatch,
  label,
  name,
  onChange,
  onFocus,
  options,
  required,
}) => {
  const debouncedAutocomplete = debounce(searchQuery => {
    return apiRequest(autocomplete, [{ searchQuery }])
  }, 250)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [prevSelected, setPrevSelected] = useState(null)

  const loadAllOptions = useCallback(
    async () => {
      const { json } = await apiRequest(autocomplete, [''])
      const suggestions = json.map(option => {
        return { value: option, label: option.name }
      })
      setIsMenuOpen(!isMenuOpen)
      setSuggestions(suggestions)
    },
    [autocomplete, isMenuOpen]
  )

  const handleSelect = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen])
  const handleOuterClick = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen])

  const onInputValueChange = useCallback(
    async (searchQuery, stateAndHelpers) => {
      if (searchQuery.length <= 2) return setIsMenuOpen(false)
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
        setIsMenuOpen(true)
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
      isOpen={isMenuOpen}
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
            autoFocus={autoFocus}
            disabled={disabled}
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
            setIsModalOpen={setIsModalOpen}
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
          {isModalOpen && (
            <AddSellerModal onChange={onChange} open={isModalOpen} selectItem={selectItem} setOpen={setIsModalOpen} />
          )}
        </div>
      )}
    </Downshift>
  )
}

export default memo(Autocomplete)
