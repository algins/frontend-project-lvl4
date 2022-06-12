import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import getModal from './modals/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const renderButton = (channel, currentChannelId, selectChannel) => (
  <Button
    onClick={selectChannel(channel.id)}
    variant={channel.id === currentChannelId ? 'secondary' : ''}
    className="w-100 rounded-0 text-start text-truncate"
  >
    # {channel.name}
  </Button>
);

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  const { modalInfo } = useSelector((state) => state.modalsReducer);

  const hideModal = () => dispatch(modalsActions.setModalInfo({ type: null, data: null }));
  const showModal = (type, data) => dispatch(modalsActions.setModalInfo({ type, data }));

  const selectChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>

        <Button
          onClick={() => showModal('addChannel')}
          variant="outline-primary"
          size="sm"
          className="py-0"
        >
          +
        </Button>
      </div>

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
            {channel.removable && (
              <Dropdown as={ButtonGroup} className="d-flex">
                {renderButton(channel, currentChannelId, selectChannel)}

                <Dropdown.Toggle
                  variant={channel.id === currentChannelId ? 'secondary' : ''}
                  className="flex-grow-0"
                >
                  <span className="visually-hidden">{t('channels.actions')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('removeChannel', channel.id)} href="#">{t('channels.remove')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => showModal('renameChannel', channel)} href="#">{t('channels.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {!channel.removable && renderButton(channel, currentChannelId, selectChannel)}
          </Nav.Item>
        ))}
      </Nav>

      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default Channels;
