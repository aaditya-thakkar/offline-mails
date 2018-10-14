import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
    display: flex;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .svg-block {
    margin-bottom: 1rem;
  }

  hr {
    border: 0;
    clear:both;
    display:block;
    width: 80%;   
    margin: 25px;            
    background-color: #DAE1E9;
    height: 1px;
  }

  .card {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    height: 25em;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    background: white;
    margin: auto;
  }

  .infoText {
    color: #48545d;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    padding: 0 3rem;
    margin-bottom: 20px;
  }

  .titleText {
    text-align: center;
    font-size: 20px;
    margin: 15px 0;
    color: #00c6ff;
  }

  .title {
    color: #48545d;
    font-size: 20px;
    line-height: 24px;
  }

  .full-width {
    width: 100% !important;
  }

  .noInput {
    outline: none;
    /* width: 70%; */
    padding: 4px 0;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #555;
    /* margin: 10px 30px; */
  }

  .otpAuthSection {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px 0 10px;
  }

  .otpButton{
    width: 50%;
  }
`;
