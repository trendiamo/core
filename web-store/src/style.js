import styledNormalize from 'styled-normalize'

export default `
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');
${styledNormalize}
body, input, textarea, button, select {
  font-size: 16px;
  font-family: "Quicksand",sans-serif;
  color: #3d4246;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
a {
  color: #3d4246;
  text-decoration: none;
}
*, *::before, *::after {
  box-sizing: border-box;
}
`
