import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';
import useSocket from '../hooks/useSocket.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const socket = useSocket();
  const inputRef = useRef();
  const channelId = useSelector((state) => state.channelsReducer.currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm }) => {
      if (body.trim().length > 0) {
        await socket.emit('newMessage', {
          channelId,
          body,
          sender: authUser.username,
        }, (res) => {
          if (res.status === 'ok') {
            resetForm();
            inputRef.current.focus();
          } else {
            toast.error(t('errors.network'));
          }
        });
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      noValidate
      className="border rounded-2"
    >
      <div className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.body}
          aria-label={t('messageForm.newMessage')}
          placeholder={t('messageForm.typeMessage')}
          name="body"
          id="body"
          className="border-0 p-0 ps-2"
          ref={inputRef}
        />

        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn btn-group-vertical"
        >
          {t('messageForm.sendMessage')}
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
