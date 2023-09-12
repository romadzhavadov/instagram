import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ThemeContextProvider } from './context/ThemeProvider.jsx';
import { LangContextProvider } from './context/LangProvider.jsx';
import { TextareaProvider } from './context/TextareaProvider.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <LangContextProvider>
        <ThemeContextProvider>
          <AuthProvider>
            <TextareaProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </TextareaProvider>
          </AuthProvider>
        </ThemeContextProvider>
      </LangContextProvider>
    </BrowserRouter>
  </Provider>,
);
