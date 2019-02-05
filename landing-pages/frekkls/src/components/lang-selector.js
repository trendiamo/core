import Downshift from 'downshift'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Globe from '../images/globe.svg'
import locales from '../../locales'

const StyledGlobe = styled.img.attrs({
  src: Globe,
})`
  margin-right: 3px;
`

const SelectContainer = styled.div`
  ${'' /* position: absolute; */}
  margin-left: 20px;
  width: 40px;
  top: 52px;
  right: 10px;
  display: none;
  @media (min-width: 900px) {
    display: flex;
  }

  input {
    -webkit-appearance: none;
    background: transparent;
    border: 0;
    width: 50px;
    font-size: 14px;
    outline: 0;
    cursor: pointer;
  }
  ul {
    position: absolute;
    left: 0px;
    width: auto;
    background-color: white;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
    z-index: 4000;
    border-radius: 10px;
  }
  li {
    text-align: center;
    cursor: pointer;
  }
  li:hover {
    background-color: #eee;
  }
  li a {
    margin: 0 !important;
    padding: 10px;
    font-size: 1em !important;
  }
`

const StyledLink = styled(Link)`
  font-size: 14px;
  line-height: 1.71;
  display: block;
  color: #393939;
  font-weight: ${({ selecteditem, item }) => (item.value.locale === selecteditem.locale ? 'bold' : 'normal')};
  text-decoration: none;
`
const localesArray = Object.keys(locales).map(e => ({ value: locales[e], label: locales[e].label }))

const purePath = (location, localePath) => {
  return location.pathname.replace(localePath, '')
}

const LangSelector = styled(({ className, locale }) => (
  <div className={className}>
    <Downshift initialSelectedItem={locales[locale]} itemToString={item => item.label}>
      {({ getRootProps, getInputProps, getItemProps, getMenuProps, isOpen, selectedItem, toggleMenu }) => (
        <SelectContainer {...getRootProps()}>
          <StyledGlobe />
          <input {...getInputProps()} onClick={toggleMenu} readOnly value={selectedItem && selectedItem.label} />
          <ul {...getMenuProps()}>
            {isOpen
              ? localesArray.map(item => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    disabled
                    item={item}
                    {...getItemProps({
                      key: item.value.locale,
                      item,
                    })}
                  >
                    <StyledLink
                      item={item}
                      selecteditem={selectedItem}
                      to={`${item.value.path}${purePath(new URL(window.location.href), locales[locale].path)}`}
                    >
                      {item.value.locale}
                    </StyledLink>
                  </li>
                ))
              : null}
          </ul>
        </SelectContainer>
      )}
    </Downshift>
  </div>
))`
  position: relative;
`

export default LangSelector
