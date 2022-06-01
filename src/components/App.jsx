import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar
        bg="white"
        expand="lg"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
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
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/login">
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
);

export default App;
