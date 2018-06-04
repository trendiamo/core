import Hr from '../shared/hr'
import { Link } from 'react-router-dom'
import { NavPics } from '../pictures'
import products from '../products.json'
import React from 'react'
import SellerInfo from '../shared/seller-info'
import styled from 'styled-components'
import { Container, Footer, Sidebar, SidebarContent } from '../shared/shell'

const StyledLink = styled(Link)`
  display: block;
  font-weight: 500;
`

const Plp = () => (
  <Container>
    <Sidebar>
      <SidebarContent>
        <SellerInfo />
        <Hr />
        <h1>{'Gilmour Niggemann'}</h1>
        <p>
          {
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        </p>
        <Hr />
        <div>
          {Object.values(products).map(e => (
            <StyledLink key={e.id} to={`/products/${e.id}`}>
              {e.name}
            </StyledLink>
          ))}
        </div>
        <Hr />
      </SidebarContent>
      <Footer />
    </Sidebar>
    <NavPics products={products} />
  </Container>
)

export default Plp
