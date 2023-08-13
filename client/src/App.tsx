import React from 'react';
import { MessageProvider } from './app/context/MessageContext';
import { Home } from './app/pages/Home';
import { AppThemeProvider } from './app/themes/AppThemeProvider';

function App() {
  return (
    <MessageProvider>
      <AppThemeProvider>
        <Home />
      </AppThemeProvider>
    </MessageProvider>
  );
}

export default App;
