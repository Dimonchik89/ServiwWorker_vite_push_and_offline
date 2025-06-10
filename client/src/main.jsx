import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// if ('serviceWorker' in navigator) {
//   // navigator.serviceWorker.register('/sw.js') // для продакшин режима
//   navigator.serviceWorker.register('/sw-dev.js') // для тестов в режиме разработки
//     .then(reg => {
//       console.log('Service worker registered:', reg);
//     });
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
