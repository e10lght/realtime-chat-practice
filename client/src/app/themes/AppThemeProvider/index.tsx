import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { theme } from '../theme';

type Props = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
