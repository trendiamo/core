import styledNormalize from 'styled-normalize'

export default `
${styledNormalize}
body, input, textarea, button, select {
  font-size: 16px;
  font-family: "Yantramanav",sans-serif;
  color: #3d4246;
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
`
