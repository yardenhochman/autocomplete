import styled, { css } from 'styled-components';
import searchIcon from './search_icon.svg';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  font-size: 14px;
  box-sizing: border-box;
`;
export const SearchBar = styled.input.attrs({
  autoComplete: 'off',
  type: 'search',
  name: 'search',
  'aria-label': 'search',
})`
  background: url(${searchIcon}) 99% no-repeat;
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

export const SuggestionItem = styled.li.attrs({
  tabIndex: 0,
})`
  max-width: 800px;
  width: 80vw;
  padding: 10px 2px;
  list-style-type: none;
  text-align: left;
  border: solid 0.5px gray;
  box-sizing: border-box;
  display: flex;

  ${({ version2 }) =>
    !version2 &&
    css`
      cursor: pointer;
    `}

  > & span {
    padding: 0 10px;
  }
  & > svg {
    cursor: pointer;
  }
`;

export const SuggestionList = styled.ul.attrs(() => ({
  role: 'listbox',
  'data-testid': 'suggestions-list',
}))`
  margin: 0;
  padding: 0;
`;
