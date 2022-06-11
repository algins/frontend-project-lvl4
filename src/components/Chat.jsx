import axios from 'axios';
import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useDispatch, batch } from 'react-redux';
import { toast } from 'react-toastify';
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
      try {
        const { data } = await axios.get(routes.api.dataPath(), { headers: getAuthHeader() });
        const { channels, messages, currentChannelId } = data;

        batch(() => {
          dispatch(channelsActions.setChannels(channels));
          dispatch(messagesActions.setMessages(messages));
          dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        });
      } catch (err) {
        toast.error(t('errors.network'));
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          sm={4}
          md={2}
          className="border-end pt-5 px-0 bg-light"
        >
          <Channels />
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />

            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
