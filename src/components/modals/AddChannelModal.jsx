import { useFormik } from 'formik';
import { uniqueId } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket.js';

const AddChannelModal = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const socket = useSocket();
  const inputRef = useRef();

  const channelNames = useSelector((state) => {
    const { channels } = state.channelsReducer;
    return channels.map(({ name }) => name);
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      await socket.emit('newChannel', {
        id: uniqueId(),
        name,
        removable: true,
      }, (res) => {
        if (res.status === 'ok') {
          setError(null);
          onHide();
        } else {
          setError(t('errors.network'));
        }
      });
    },
    validationSchema: yup.object().shape({
      name: yup.string().trim().required().min(3).max(20).notOneOf(channelNames),
    }),
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              ref={inputRef}
              isInvalid={formik.errors.name}
            />

            <Form.Control.Feedback type="invalid">{formik.errors.name || error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">{t('addChannelModal.cancel')}</Button>

          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            {t('addChannelModal.ok')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;
