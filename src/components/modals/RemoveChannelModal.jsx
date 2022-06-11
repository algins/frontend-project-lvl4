import { useFormik } from 'formik';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/useSocket.js';

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const socket = useSocket();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await socket.emit('removeChannel', {
        id: modalInfo.data,
      }, (res) => {
        if (res.status === 'ok') {
          onHide();
          toast.success(t('removeChannelModal.channelRemoved'));
        } else {
          toast.error(t('errors.network'));
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
