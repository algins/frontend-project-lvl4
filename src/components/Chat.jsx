import axios from 'axios';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useDispatch, batch } from 'react-redux';
import Channels from './Channels.jsx';
import MessageForm from './MessageForm.jsx';
import Messages from './Messages.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  const getAuthHeader = () => {
    if (authUser && authUser.token) {
      return { Authorization: `Bearer ${authUser.token}` };
    }

    return {};
  };

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
  }, []);

  return (
    <Container className="h-100 my-sm-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={12}
          sm={4}
          md={2}
          className="border-end pt-2 pt-sm-5 px-0 bg-light"
        >
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
          </div>

          <Channels />
        </Col>

        <Col className="p-0">
          <div className="d-flex flex-column h-100">
            <Messages />

            <div className="mt-auto px-2 px-sm-5 py-3">
              <MessageForm />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
