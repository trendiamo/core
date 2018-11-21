import { h } from 'preact'

const InlineCode = props => (
  <code
    {...props}
    style={{
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a',
    }}
  />
)

const Link = ({ children, href, ...props }) => (
  <a
    href={href}
    {...props}
    style={{
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
    }}
  >
    {children}
  </a>
)

const Main = props => (
  <article
    {...props}
    style={{
      margin: 15,
      maxWidth: 600,
      lineHeight: 1.6,
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
    }}
  />
)

const NavButton = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      font: 'inherit',
    }}
    type="button"
  >
    {children}
  </button>
)

const Note = props => (
  <p
    {...props}
    style={{
      opacity: 0.5,
    }}
  />
)

export { InlineCode, Link, Main, NavButton, Note }
