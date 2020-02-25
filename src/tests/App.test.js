import React from 'react';
import { render, fireEvent, getNodeText } from '@testing-library/react';
import SearchPage from 'SearchPage';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { Provider } from 'context';

jest.mock('axios');

jest.mock('lodash', () => ({
  debounce: fn => fn,
}));

const apiResponse = {
  data: [
    { term: 'Abyssinian', resultCount: 61 },
    { term: 'Aegean', resultCount: 26 },
    { term: 'American Curl', resultCount: 56 },
    { term: 'American Bobtail', resultCount: 3 },
    { term: 'American Shorthair', resultCount: 26 },
  ],
};

const setup = version2 => {
  const utils = render(
    <Provider value={{ version2 }}>
      <SearchPage />
    </Provider>,
  );
  const input = utils.getByLabelText('search');

  return {
    input,
    ...utils,
    fillInput: testInput => fireEvent.change(input, { target: { value: testInput } }),
    getListItems: () => utils.getAllByTestId('suggestion-li'),
    getSuggestionArrows: () => utils.getAllByTestId('suggestion-arrow-svg'),
    queryListItem: () => utils.queryByTestId('suggestion-li'),
    keyUp: async () => {
      await act(async () => {
        fireEvent.keyUp(input);
      });
    },
  };
};

test('input works', () => {
  const { input, fillInput } = setup();
  act(() => {
    fillInput('a');
  });
  expect(input.value).toBe('a');
});
test('when input string is under 3 char - no suggestions', () => {
  const { input, fillInput, queryListItem } = setup();
  fillInput('Am');
  fireEvent.keyUp(input);
  expect(queryListItem()).toBeNull();
});
test('when input string is 3 char and there are matches. show suggestions', async () => {
  const { keyUp, getListItems, fillInput } = setup();
  fillInput('Ame');
  axios.get.mockResolvedValue(apiResponse);
  await keyUp();
  expect(axios.get).toHaveBeenCalled();
  expect(getListItems()).toBeDefined();
});
test('when input string is 3 char and then 2 again. hide suggestions', async () => {
  const { keyUp, queryListItem, fillInput } = setup();
  fillInput('Am');
  await keyUp();
  expect(queryListItem()).toBeNull();
});
test('when a suggestion is clicked', async () => {
  const { keyUp, getListItems, queryListItem, fillInput, input } = setup();
  fillInput('Ame');
  await keyUp();
  act(() => {
    fireEvent.click(getListItems()[0]);
  });
  expect(input.value).toBe('American Curl'); // picked suggestion is placed into input field
  expect(queryListItem()).toBeNull(); // suggestions are hidden after the click
});
test('when a suggestion is selected via enter', async () => {
  const { input, getListItems, fillInput, keyUp } = setup();
  fillInput('Ame');
  await keyUp();
  act(() => {
    fireEvent.keyDown(getListItems()[0], {
      key: 'Enter',
      code: 13,
      which: 13,
      keyCode: 13,
      charCode: 13,
    });
  });
  expect(input.value).toBe('American Curl');
});
test('check bold suggestion text matches input', async () => {
  const { getAllByTestId, fillInput, keyUp } = setup();
  fillInput('Ame');
  await keyUp();
  expect(getNodeText(getAllByTestId('bold-text')[0])).toBe('Ame');
});
test('version2: input works', () => {
  const { fillInput, input } = setup(true);
  fillInput('a');
  expect(input.value).toBe('a');
});
test('version2: when input string is under 3 char - no suggestions', () => {
  const { input, fillInput, queryListItem } = setup(true);
  fillInput('Am');
  fireEvent.keyUp(input);
  expect(queryListItem()).toBeNull();
});
test('version2:  when input string is 3 char and then 2 again. hide suggestions', async () => {
  const { keyUp, queryListItem, fillInput } = setup(true);
  fillInput('Am');
  await keyUp();
  expect(queryListItem()).toBeNull();
});
test('version2: when a suggestion is clicked', async () => {
  const { keyUp, getSuggestionArrows, getListItems, fillInput, input } = setup(true);
  fillInput('Ame');
  await keyUp();
  act(() => {
    fireEvent.click(getSuggestionArrows()[0]);
  });
  await keyUp();

  expect(input.value).toBe('American Curl');
  expect(getListItems()).toBeDefined();
});
test('version2: when a suggestion is selected via enter', async () => {
  const { input, getSuggestionArrows, getListItems, fillInput, keyUp } = setup(true);
  fillInput('Ame');
  await keyUp();
  act(() => {
    fireEvent.keyDown(getSuggestionArrows()[0], {
      key: 'Enter',
      code: 13,
      which: 13,
      keyCode: 13,
      charCode: 13,
    });
  });
  await keyUp();
  expect(input.value).toBe('American Curl');
  expect(getListItems()).toBeDefined();
});
