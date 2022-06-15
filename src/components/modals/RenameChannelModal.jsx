import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useSocket from '../../hooks/useSocket.js';

const RenameChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
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
      name: modalInfo.data.name,
    },
    onSubmit: async ({ name }) => {
      await renameChannel(modalInfo.data.id, name, (res) => {
        if (res.status === 'ok') {
          onHide();
          toast.success(t('renameChannelModal.channelRenamed'));
        } else {
          toast.error(t('errors.network'));
        }
      });
    },
    validationSchema: yup.object().shape({
      name: yup.string().trim().required()
        .min(3, t('renameChannelModal.nameLength'))
        .max(20, t('renameChannelModal.nameLength'))
        .notOneOf(channelNames),
    }),
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
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

            <Form.Label visuallyHidden htmlFor="name">{t('renameChannelModal.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">{t('renameChannelModal.cancel')}</Button>

          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            {t('renameChannelModal.ok')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RenameChannelModal;
