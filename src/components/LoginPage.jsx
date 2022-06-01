import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoginFormImage from './LoginFormImage.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.api.loginPath(), values);
        localStorage.setItem('authUser', JSON.stringify(res.data));
        auth.logIn();
        history.push(routes.web.homePath());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required(),
      password: yup.string().required(),
    }),
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
  });

  return (
    <Card className="shadow-sm">
      <Row as={Card.Body} className="p-5">
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <LoginFormImage />
        </Col>

        <Col
          as={Form}
          xs={12}
          md={6}
          onSubmit={formik.handleSubmit}
          className="mt-3 mt-mb-0"
        >
          <h1 className="text-center mb-4">{t('loginPage.login')}</h1>

          <Form.Group className="form-floating mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder={t('loginPage.username')}
              name="username"
              id="username"
              autoComplete="username"
              isInvalid={authFailed}
              required
              ref={inputRef}
            />

            <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t('loginPage.password')}
              name="password"
              id="password"
              autoComplete="current-password"
              isInvalid={authFailed}
              required
            />

            <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t('loginPage.invalidEmailOrPassword')}</Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={formik.isSubmitting}
          >
            {t('loginPage.login')}
          </Button>
        </Col>
      </Row>

      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('loginPage.dontHaveAccount')}</span>
          &nbsp;
          <a href="/signup">{t('loginPage.registration')}</a>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginPage;