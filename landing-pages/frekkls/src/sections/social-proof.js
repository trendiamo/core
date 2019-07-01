import LogoBaldessarini from '../images/logo-baldessarini'
import LogoExitwell from '../images/logo-exitwell'
import LogoPampling from '../images/logo-pampling'
import LogoPierreCardin from '../images/logo-pierre-cardin'
import LogoPionier from '../images/logo-pionier'
import LogoShopinfo from '../images/logo-shopinfo'
import LogoSupercommerce from '../images/logo-supercommerce'
import LogoTimeblock from '../images/logo-timeblock'
import LogoTontonEtFils from '../images/logo-tontonetfils'
import LogoVilladonatello from '../images/logo-villadonatello'

import React from 'react'
import styled from 'styled-components'

const SocialProof = styled(({ className }) => (
  <div className={className}>
    <p className="h4">{'You are in good company.'}</p>
    <div className="logos-container">
      <LogoPierreCardin className="logo" />
      <LogoShopinfo className="logo" />
      <LogoSupercommerce className="logo" />
      <LogoBaldessarini className="logo" />
      <LogoTimeblock className="logo" />
      <LogoPampling className="logo" />
      <LogoTontonEtFils className="logo" />
      <LogoPionier className="logo" />
      <LogoExitwell className="logo" />
      <LogoVilladonatello className="logo" />
    </div>
  </div>
))`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding-top: 3vh;
  padding-bottom: 3vh;

  .h4 {
    width: 100%;
    font-size: 4vw;
    font-weight: bold;
    line-height: 3;
    text-align: center;
  }

  .logos-container {
    flex: 1;
    flex-wrap: wrap;
    display: flex;
    width: 90vw;
    justify-content: center;
  }

  .logo {
    width: 15vw;
    margin: 1rem;
  }
`

export default SocialProof
