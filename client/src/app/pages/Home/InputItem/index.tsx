import React, { useState } from 'react';
import { Button } from '../../../../libs/Button';
import { TextField } from '../../../../libs/TextField';
import { useMessage } from '../../../context/MessageContext';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; // gapはFlexまたはGrid要素間の隙間を作成します。必要に応じて調整してください。
`;

export const InputPage = () => {
  const [message, setMessage] = useState<string>('');
  const { addMessage } = useMessage();

  const sendMessage = () => {
    if (message !== '') {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <TextField
        type="text"
        placeholder="メッセージを入力してください"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button label="送信" onClick={sendMessage} />
    </InputContainer>
  );
};
