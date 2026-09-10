import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthInitializer from './AuthInitializer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>\
    <AuthInitializer />
    <App />
    </Provider>
  </StrictMode>,
)
