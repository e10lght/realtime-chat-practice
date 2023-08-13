import React from 'react';
import styled from '@emotion/styled';

const ChatItemContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageContent = styled.div`
  flex-grow: 1;
`;

const SenderName = styled.div`
  font-weight: bold;
`;

const MessageText = styled.p`
  margin: 5px 0;
`;

const Timestamp = styled.span`
  font-size: 0.8em;
  color: #888;
`;

type MessageProps = {
  message: {
    senderName: string;
    senderAvatar: string;
    text: string;
    timestamp: string;
  };
};

export const MessageItem: React.FC<MessageProps> = ({ message }) => {
  return (
    <ChatItemContainer>
      <Avatar src={message.senderAvatar} alt={message.senderName} />
      <MessageContent>
        <SenderName>{message.senderName}</SenderName>
        <MessageText>{message.text}</MessageText>
        <Timestamp>{message.timestamp}</Timestamp>
      </MessageContent>
    </ChatItemContainer>
  );
};
