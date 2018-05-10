const template = `
  <iframe seamless src="https://trendiamo.com/" style="display:block;border:0;width:100vw;height:100vh;" />
`
export default () => {
  document.querySelector('body').innerHTML = template
}
