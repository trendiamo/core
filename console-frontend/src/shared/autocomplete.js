import debounce from 'debounce-promise'
import Downshift from 'downshift'
import React from 'react'
import styled from 'styled-components'
import { apiRequest } from 'utils'
import { ArrowDropDown } from '@material-ui/icons'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Paper } from '@material-ui/core'
import { suggestionTypes } from 'shared/autocomplete-options'

const StyledArrowDropDown = styled(ArrowDropDown)`
  &:hover {
    cursor: pointer;
  }
`

const DropdownButton = ({ loadAllOptions }) => (
  <InputAdornment position="end">
    <StyledArrowDropDown onClick={loadAllOptions} />
  </InputAdornment>
)

const AutocompleteInput = ({ formControlProps, inputProps, label, name, loadAllOptions }) => (
  <FormControl margin="normal" {...formControlProps}>
    <InputLabel htmlFor={inputProps.id} id={inputProps['aria-labelledby']}>
      {label}
    </InputLabel>
    <Input
      fullWidth
      name={name}
      type="text"
      {...inputProps}
      endAdornment={<DropdownButton loadAllOptions={loadAllOptions} />}
    />
  </FormControl>
)

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

const Autocomplete = ({
  disabled,
  label,
  required,
  fullWidth,
  name,
  defaultPlaceholder,
  onInputValueChange,
  prevSelected,
  onChange,
  handleSelect,
  loadAllOptions,
  setPrevSelected,
  options,
  handleOuterClick,
  menuIsOpen,
  suggestions,
  initialSelectedItem,
}) => (
  <Downshift
    initialSelectedItem={initialSelectedItem}
    isOpen={menuIsOpen}
    itemToString={selected => (selected ? selected.label : '')}
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

export default compose(
  withProps(({ autocomplete }) => ({
    debouncedAutocomplete: debounce(async searchQuery => await apiRequest(autocomplete, [{ searchQuery }]), 250),
  })),
  withState('menuIsOpen', 'setMenuIsOpen', false),
  withState('suggestions', 'setSuggestions', []),
  withState('prevSelected', 'setPrevSelected', null),
  withHandlers({
    loadAllOptions: ({ setSuggestions, autocomplete, setMenuIsOpen, menuIsOpen }) => async () => {
      const { json } = await apiRequest(autocomplete, [''])
      const suggestions = json.map(option => {
        return { value: option, label: option.name }
      })
      setMenuIsOpen(!menuIsOpen)
      setSuggestions(suggestions)
    },
    handleSelect: ({ setMenuIsOpen }) => () => {
      setMenuIsOpen(false)
    },
    handleOuterClick: ({ setMenuIsOpen }) => () => {
      setMenuIsOpen(false)
    },
    onInputValueChange: ({ debouncedAutocomplete, setMenuIsOpen, setSuggestions }) => async (
      searchQuery,
      stateAndHelpers
    ) => {
      if (searchQuery.length <= 2) return setMenuIsOpen(false)
      const { json } = await debouncedAutocomplete(searchQuery)
      const options = json.map(option => {
        return { value: option, label: option.name }
      })
      if (stateAndHelpers.type === '__autocomplete_change_input__') {
        setMenuIsOpen(true)
      }
      setSuggestions(options)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initialSelectedItem, setPrevSelected } = this.props
      setPrevSelected(initialSelectedItem)
    },
  })
)(Autocomplete)
