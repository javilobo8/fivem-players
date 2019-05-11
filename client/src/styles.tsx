import { rem } from 'polished';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
  }
`;

export const AppContainer = styled.div`
  padding: ${rem('10px')};
  margin: 0 auto;
  max-width: ${rem('400px')};
`;
