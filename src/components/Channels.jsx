import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);

  return (
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
          <Button variant={channel.id === currentChannelId ? 'secondary' : ''} className="w-100 rounded-0 text-start">
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;
