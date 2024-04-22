import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalProvider } from './context/globalContext.jsx'
import {GlobalStyle} from "./globalStyle.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
  </React.StrictMode>,
)
