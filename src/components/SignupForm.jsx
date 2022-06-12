import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [signupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
      setSignupFailed(false);

      try {
        const res = await axios.post(routes.api.signupPath(), { username, password });
        logIn(res.data);
        history.replace(routes.web.homePath());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignupFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required()
        .min(3, t('signupForm.usernameLength'))
        .max(20, t('signupForm.usernameLenght')),
      password: yup.string().required().min(6, t('signupForm.passwordLength')),
      confirmPassword: yup.string().required().oneOf([
        yup.ref('password'),
        null,
      ], t('signupForm.confirmPasswordMatch')),
    }),
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col
          xs={12}
          md={8}
          xxl={6}
        >
          <Card className="shadow-sm">
            <Row as={Card.Body} className="p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  roundedCircle
                  src="https://picsum.photos/id/8/200/200"
                  alt={t('signupForm.title')}
                />
              </Col>

              <Col
                as={Form}
                xs={12}
                md={6}
                onSubmit={formik.handleSubmit}
                className="mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('signupForm.title')}</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('signupForm.usernameLenght')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={formik.errors.username || signupFailed}
                    required
                    ref={inputRef}
                  />

                  <Form.Label htmlFor="username">{t('signupForm.username')}</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                    {signupFailed && t('signupForm.userExists')}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('signipForm.passwordLength')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={formik.errors.password}
                    required
                  />

                  <Form.Label htmlFor="password">{t('signupForm.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder={t('signupForm.confirmPasswordMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={formik.errors.confirmPassword}
                    required
                  />

                  <Form.Label htmlFor="password">{t('signupForm.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('signupForm.signup')}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
