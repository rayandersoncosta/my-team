/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { HomePage } from './pages/HomePage/Loadable';
import { TeamPage } from './pages/TeamPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { selectIsAuthenticated } from './pages/HomePage/Features/LoginForm/slice/selectors';
import { useSelector } from 'react-redux';
import { theme } from 'styles/themes';
import { selectTheme } from './components/AppBarComponent/Features/ThemeFeature/slice/selectors';
import { AppBarComponent } from './components/AppBarComponent';
import { GlobalStyle } from 'styles/global-styles';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { theme: themeSelected } = useSelector(selectTheme);

  return (
    <ThemeProvider theme={theme(themeSelected)}>
      <GlobalStyle theme={themeSelected} />
      <AppBarComponent />
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/team"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TeamPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
