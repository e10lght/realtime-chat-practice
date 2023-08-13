import React from 'react';
import { useMessage } from '../../context/MessageContext';
import { InputPage } from './InputItem';
import { MessageList } from './MessageList.tsx';
import styled from '@emotion/styled';

const FixedInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 16px;
  z-index: 1000;
`;

export const Home = () => {
  const { messages } = useMessage();

  //   const sampleMessage = messages.map((message) => {
  //     return {
  //       senderName: 'John Doe',
  //       senderAvatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
  //       text: message,
  //       timestamp: '10:30 AM',
  //     };
  //   });

  return (
    <>
      <FixedInputContainer>
        <InputPage />
      </FixedInputContainer>
      <MessageList messages={messages} />
    </>
  );
};
