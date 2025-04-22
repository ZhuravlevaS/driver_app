import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './views/App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {RideInfo} from "./views/RideInfo.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ride-info" element={<RideInfo/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
