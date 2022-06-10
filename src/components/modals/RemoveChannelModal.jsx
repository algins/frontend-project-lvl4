import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/useSocket.js';

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await socket.emit('removeChannel', {
        id: modalInfo.data,
      }, (res) => {
        if (res.status === 'ok') {
          setError(null);
          onHide();
        } else {
          setError(t('errors.network'));
        }
      });
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('removeChannelModal.title')}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <p className="lead">{t('removeChannelModal.confirm')}</p>
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">{t('removeChannelModal.cancel')}</Button>

          <Button
            type="submit"
            variant="danger"
            disabled={formik.isSubmitting}
          >
            {t('removeChannelModal.ok')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveChannelModal;
