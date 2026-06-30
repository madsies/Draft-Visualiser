import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    mode: "light", 
    background:{
      default: "#F1F1F1",
      paper: "#f8f8f8",
    },
    primary: {
      main: "#218ffe",
    },
    secondary: {
      main: "#F99e1a" 
    },
    info:{
      main: "#1b1b1b"
    }},
    typography:{
    allVariants:{
      fontFamily: "Outfit, sans-serif"
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
