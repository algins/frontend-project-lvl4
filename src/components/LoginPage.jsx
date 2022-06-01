import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoginFormImage from './LoginFormImage.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();

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
        throw new Error();
      } catch (err) {
        setAuthFailed(true);
        inputRef.current.select();
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
          <h1 className="text-center mb-4">{t('loginForm.login')}</h1>

          <Form.Group className="form-floating mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder={t('loginForm.username')}
              name="username"
              id="username"
              autoComplete="username"
              isInvalid={authFailed}
              required
              ref={inputRef}
            />

            <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t('loginForm.password')}
              name="password"
              id="password"
              autoComplete="current-password"
              isInvalid={authFailed}
              required
            />

            <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t('loginForm.invalidEmailOrPassword')}</Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={formik.isSubmitting}
          >
            {t('loginForm.login')}
          </Button>
        </Col>
      </Row>

      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('loginForm.dontHaveAccount')}</span>
          &nbsp;
          <a href="/signup">{t('loginForm.registration')}</a>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LoginPage;
