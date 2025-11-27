import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ThemeContext from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider>
        <ThemeContext>
          <App />
        </ThemeContext>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
