import React, { useContext, useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3100';

type Message = {
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
};

interface MessageContextType {
  messages: Message[];
  addMessage: (newMessage: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const socket = socketIOClient(SOCKET_SERVER_URL);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // サーバーからのメッセージを受信するリスナーを設定
    socket.on('message', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    // コンポーネントのアンマウント時にリスナーをクリーンアップ
    return () => {
      socket.off('message');
    };
  }, []);

  const addMessage = (newMessage: string) => {
    socket.emit('message', newMessage);
    // setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
