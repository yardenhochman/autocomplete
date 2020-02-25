import React from 'react';
import { memoize } from 'lodash';

const BoldMatchingText = memoize(
  searchText => ({ suggestion }) => {
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
  },
  (searchText, results) => results.length,
);

export default BoldMatchingText;
