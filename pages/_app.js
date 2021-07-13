import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'
// import background from '../src/img/A11fIxcmFtL._AC_SL1500_.jpg'

const GlobalStyle = createGlobalStyle`
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  body {
    font-family: sans-serif;
    background-color: #F1F9FE;
    /* background-image: "url(A11fIxcmFtL._AC_SL1500_.jpg)"; */
    background-image: url("https://m.media-amazon.com/images/I/A11fIxcmFtL._AC_SL1500_.jpg");
    height: 100%; 
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
