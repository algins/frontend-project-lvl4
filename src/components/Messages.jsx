import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { t } = useTranslation();
  const bottomRef = useRef();

  const channel = useSelector((state) => {
    const { channels, currentChannelId } = state.channelsReducer;
    return channels.find(({ id }) => id === currentChannelId);
  });

  const channelMessages = useSelector((state) => {
    const { messages } = state.messagesReducer;
    return messages.filter(({ channelId }) => channelId === channel.id);
  });

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [channelMessages]);

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

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map(({ id, sender, body }) => (
          <div key={id} className="text-break mb-2">
            <b>{sender}</b>
            :&nbsp;
            {filter.clean(body)}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default Messages;
