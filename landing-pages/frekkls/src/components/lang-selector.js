import Downshift from 'downshift'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Globe from '../images/globe.svg'
import locales from '../../locales'

const StyledLink = styled(Link)`
  font-size: 14px;
  line-height: 1.71;
  display: block;
  color: #393939;
  text-decoration: none;
  padding: 5px 20px;
  &[aria-current] {
    font-weight: 500;
  }
  &:hover {
    background-color: #eee;
  }
`

const SelectContainer = styled.div`
  margin-left: ${({ isMobileMenu }) => (isMobileMenu ? '0px' : '20px')};
  display: ${({ isMobileMenu }) => (isMobileMenu ? 'flex' : 'none')};
  position: relative;
  @media (min-width: 900px) {
    display: flex;
  }
  button {
    appearance: none;
    background-color: transparent;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    display: flex;
    cursor: pointer;
  }
  img {
    padding-right: 3px;
    height: ${({ isMobileMenu }) => (isMobileMenu ? '20px' : '18px')};
    width: ${({ isMobileMenu }) => (isMobileMenu ? '20px' : '18px')};
  }
  input {
    appearance: none;
    color: #393939;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    font-size: ${({ isMobileMenu }) => (isMobileMenu ? '20px' : '14px')};
    font-weight: 500;
    font-family: Roboto, sans-serif;
    width: ${({ isMobileMenu }) => (isMobileMenu ? '100%' : '50px')};
  }
  ul {
    position: absolute;
    top: 28px;
    right: ${({ isMobileMenu }) => (isMobileMenu ? '-40px' : '0px')};
    width: auto;
    background-color: white;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
    z-index: 4000;
  }
  li {
    text-align: left;
  }
`

const localesArray = Object.keys(locales).map(e => ({ value: locales[e], label: locales[e].label }))

const purePath = (item, locale) => `${item.value.path}${location.pathname.replace(locales[locale].path, '')}`

const LangSelector = ({ locale, isMobileMenu }) => (
  <Downshift initialSelectedItem={locales[locale]} itemToString={item => item.label}>
    {({ getRootProps, getInputProps, getItemProps, getMenuProps, isOpen, selectedItem, toggleMenu }) => (
      <SelectContainer isMobileMenu={isMobileMenu} {...getRootProps()}>
        <button onClick={toggleMenu} type="button">
          <img alt="" src={Globe} />
          <input {...getInputProps()} readOnly value={selectedItem && selectedItem.label} />
        </button>
        <ul {...getMenuProps()}>
          {isOpen &&
            localesArray.map(item => (
              <li key={item.value.locale} {...getItemProps({ item })}>
                <StyledLink to={purePath(item, locale)}>{item.value.locale}</StyledLink>
              </li>
            ))}
        </ul>
      </SelectContainer>
    )}
  </Downshift>
)

export default LangSelector
