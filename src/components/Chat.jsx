import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useDispatch, batch } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../routes.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  if (authUser && authUser.token) {
    return { Authorization: `Bearer ${authUser.token}` };
  }

  return {};
};

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.api.dataPath(), { headers: getAuthHeader() });
      const { channels, messages, currentChannelId } = data;

      batch(() => {
        dispatch(channelsActions.setChannels(channels));
        dispatch(messagesActions.setMessages(messages));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      });
    };

    fetchData();
    inputRef.current.focus();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={4}
          md={2}
          className="border-end pt-5 px-0 bg-light"
        >
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
          </div>

          <Channels />
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />

            <div className="mt-auto px-5 py-3">
              <Form noValidate className="border rounded-2">
                <div className="input-group has-validation">
                  <Form.Control
                    aria-label={t('chat.newMessage')}
                    placeholder={t('chat.typeMessage')}
                    name="body"
                    className="border-0 p-0 ps-2"
                    ref={inputRef}
                  />

                  <Button
                    type="submit"
                    disabled
                    className="btn btn-group-vertical"
                  >
                    {t('chat.sendMessage')}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
