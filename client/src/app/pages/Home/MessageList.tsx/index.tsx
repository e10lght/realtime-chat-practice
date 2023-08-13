import React from 'react';
import { MessageItem } from '../../../../libs/MessageItem/index';

type MessageListProps = {
  messages: {
    senderName: string;
    senderAvatar: string;
    text: string;
    timestamp: string;
  }[];
};

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};
