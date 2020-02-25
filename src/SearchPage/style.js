import styled, { css } from 'styled-components';
import { SearchSVG } from 'icons';

export const SearchBar = styled.input.attrs({
  autoComplete: 'off',
  type: 'search',
  name: 'search',
  'aria-label': 'search',
  'data-testid': 'search-bar-input',
})`
  background: url(${SearchSVG}) 99% no-repeat;
  margin-top: 20px;
  background-size: 20px;
  padding: 8px;
  max-width: 800px;
  width: 80vw;
  border: gray solid 0.4px;
  &:focus {
    border: black solid 1px;
  }
  ::-webkit-search-cancel-button {
    ${({ noClear }) =>
      noClear &&
      css`
        display: none;
      `};
    -webkit-appearance: searchfield-cancel-button;
    position: relative;
    right: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Page = styled.div.attrs({
  'data-testid': 'page-wrapper',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  font-size: 14px;
  box-sizing: border-box;
`;
