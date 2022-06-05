import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Chat from './Chat.jsx';
import LoginForm from './LoginForm.jsx';
import LogoutButton from './LogoutButton.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import routes from '../routes.js';

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar
          bg="white"
          expand="lg"
          variant="light"
          className="shadow-sm"
        >
          <Container>
            <Navbar.Brand href={routes.web.homePath()}>{t('app.title')}</Navbar.Brand>
            <LogoutButton />
          </Container>
        </Navbar>

        <Switch>
          <Route exact path={routes.web.homePath()}>
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          </Route>

          <Route path={routes.web.loginPath()}>
            <LoginForm />
          </Route>

          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
