import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('authUser');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Redirect to={routes.web.loginPath()} />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>{t('app.logout')}</Button> : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar
          bg="white"
          expand="lg"
          variant="light"
        >
          <Container>
            <Navbar.Brand href={routes.web.homePath()}>Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>

        <Container fluid className="h-100">
          <Row className="justify-content-center align-content-center h-100">
            <Col
              xs={12}
              md={8}
              xxl={6}
            >
              <Switch>
                <Route exact path={routes.web.homePath()}>
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                </Route>

                <Route path={routes.web.loginPath()}>
                  <LoginPage />
                </Route>

                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
