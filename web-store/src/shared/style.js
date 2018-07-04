import styledNormalize from 'styled-normalize'

export default `
${styledNormalize}
body, input, textarea, button, select {
  font-size: 16px;
  font-family: "Yantramanav",sans-serif;
  color: #252525;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
a {
  color: #3d4246;
  text-decoration: none;
}
a, button, [role="button"], input, label, select, textarea {
  touch-action: manipulation;
}
*, *::before, *::after {
  box-sizing: border-box;
}
.xcomponent-outlet > iframe.xcomponent-component-frame {
  z-index: 0 !important;
}
.hs-form-required {
  display: none;
}
.hs-input {
  margin-bottom: 1rem;
  width: 100% !important;
  padding: 10px 18px;
  border: 1px solid #515151;
  background-color: #fff;
  color: #000;
  max-width: 100%;
  line-height: 1.2;
  border-radius: 2px;
}
.hs-error-msgs {
  margin: 0;
  padding: 0;
}
.hs-error-msgs li {
  list-style: none;
}
.hs-error-msgs label {
  margin-bottom: 5px;
}
.hs-button {
  background-color: #36d4bc;
  border: 1px solid transparent;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-family: "Yantramanav",sans-serif;
  font-size: 14px;
  font-weight: 700;
  max-width: 492px;
  letter-spacing: 0.08em;
  line-height: 1.2;
  width: 100%;
  white-space: normal;
  padding: 10px 18px;
  text-transform: uppercase;
  user-select: none;
}
`
