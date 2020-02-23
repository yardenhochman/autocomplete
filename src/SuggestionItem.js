import React from 'react';
import { string, func } from 'prop-types';
import { Suggestion } from './style';

const makeBold = searchText => targetText => {
  const startBoldIndex = targetText.indexOf(searchText);
  const endBoldIndex = startBoldIndex + searchText.length;
  return (
    <>
      <span>
        {targetText.substring(0, startBoldIndex)}
        <b>
          {targetText.substring(startBoldIndex, endBoldIndex + 1)}
        </b>
        {targetText.substring(endBoldIndex + 1, targetText.length)}
      </span>
    </>
  );
};

const SuggestionItem = ({ text, onClick, searchText }) => {
  const makeSearchText = React.useCallback(makeBold(searchText), [
    searchText,
  ]);
  return (
    <Suggestion onClick={onClick}>
      <span>{makeSearchText(text)}</span>
    </Suggestion>
  );
};

export default SuggestionItem;

SuggestionItem.propTypes = {
  searchText: string.isRequired,
  text: string.isRequired,
  onClick: func.isRequired,
};
