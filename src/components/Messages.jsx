import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { t } = useTranslation();

  const channel = useSelector((state) => {
    const { channels, currentChannelId } = state.channelsReducer;
    return channels.find(({ id }) => id === currentChannelId);
  });

  const channelMessages = useSelector((state) => {
    const { messages } = state.messagesReducer;
    return messages.filter(({ channelId }) => channelId === channel.id);
  });

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {channel?.name}
          </b>
        </p>

        <span className="text-muted">{t('messages.count', { count: channelMessages.length })}</span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {channelMessages.map(({ author, text }) => (
          <div className="text-break mb-2">
            <b>{author}</b>
            :
            {text}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
