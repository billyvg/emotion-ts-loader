import React from 'react';
import { Header } from './components/Header';
import { Header as Header2 } from './components/Header.tsx2';

export const App = () => {
  return (
    <div>
      <Header>Test</Header>
      <Header2>Test</Header2>
    </div>
  );
};
