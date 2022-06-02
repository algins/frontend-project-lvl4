import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const getAuthHeader = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  if (authUser && authUser.token) {
    return { Authorization: `Bearer ${authUser.token}` };
  }

  return {};
};

const ChannelList = ({ channels }) => (
  <Nav
    as="ul"
    variant="pills"
    fill
    className="flex-column px-2"
  >
    {channels.map((channel) => (
      <Nav.Item
        as="li"
        key={channel.id}
        className="w-100"
      >
        <Button variant="secondary" className="w-100 rounded-0 text-start">
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </Nav.Item>
    ))}
  </Nav>
);

const MessageList = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5 ">
    {messages.map(({ author, text }) => (
      <div className="text-break mb-2">
        <b>{author}</b>
        :
        {text}
      </div>
    ))}
  </div>
);

const ChatPage = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.api.dataPath(), { headers: getAuthHeader() });
        setChannels(data.channels);
        setMessages(data.messages);
        setCurrentChannelId(data.currentChannelId);
      } catch (err) {
        console.log(err);
      }
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
            <span>{t('chatPage.channels')}</span>
          </div>

          <ChannelList channels={channels} />
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {currentChannelId}
                </b>
              </p>

              <span className="text-muted">{t('chatPage.messagesCount', { count: messages.length })}</span>
            </div>

            <MessageList messages={messages} />

            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Form.Control
                    aria-label={t('chatPage.newMessage')}
                    placeholder={t('chatPage.typeMessage')}
                    name="body"
                    className="border-0 p-0 ps-2"
                    ref={inputRef}
                  />

                  <Button
                    type="submit"
                    disabled
                    className="btn btn-group-vertical"
                  >
                    {t('chatPage.sendMessage')}
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

export default ChatPage;
