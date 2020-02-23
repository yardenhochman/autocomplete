import styled from 'styled-components';

export const SearchBar = styled.input.attrs({
  autoComplete: 'off',
  type: 'text',
  name: 'search',
})`
  width: 200px;
  height: 20px;
  border: gray 1px solid;
  &:focus {
    border: black 1px solid;
  }
`;
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const Suggestion = styled.li.attrs({
  tabIndex: 0,
})`
  padding: 10px 2px;
  width: 202px;
  /* padding: 0.75rem 1.15rem; */
  list-style-type: none;
  text-align: left;
  border: solid 0.5px gray;

  & span {
    padding: 0 10px;
  }
`;

export const SuggestionList = styled.ul.attrs(() => ({
  role: 'listbox',
}))`
  margin: 0;
  padding: 0;
`;
