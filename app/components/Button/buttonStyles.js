import { css } from 'styled-components';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;
  background: #4285f4;
  color: #fff;
  box-shadow: none;
  /* background: #1a73e8; */
  border: none;
  width: 80%;
  height: 2.5rem;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  &:active {
    background: rgb(26, 115, 232);
    color: #fff;
  }
`;

export default buttonStyles;
