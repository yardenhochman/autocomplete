import React from 'react';

const createSuggestionText = searchText => ({ suggestion }) => {
  const startBoldIndex = suggestion.toLowerCase().indexOf(searchText.toLowerCase());
  const endBoldIndex = startBoldIndex + searchText.length;
  return (
    <>
      <span>
        {suggestion.substring(0, startBoldIndex)}
        <b>{suggestion.substring(startBoldIndex, endBoldIndex)}</b>
        {suggestion.substring(endBoldIndex, suggestion.length)}
      </span>
    </>
  );
};

export default createSuggestionText;
