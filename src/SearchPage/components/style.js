import styled, { css } from 'styled-components';

export const SuggestionItem = styled.li.attrs({
  'data-testid': 'suggestion-li',
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
