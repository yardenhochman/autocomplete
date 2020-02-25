import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import axiosMock from 'axios';
import App from './components/SearchPage';
import { Provider } from './context';
// jest.mock('axios');

jest.mock('./components/util', () => ({
  fetcher: () => () => [
    { term: 'Abyssinian', resultCount: 61 },
    { term: 'Aegean', resultCount: 26 },
    { term: 'American Curl', resultCount: 56 },
    { term: 'American Bobtail', resultCount: 3 },
    { term: 'American Shorthair', resultCount: 26 },
  ],
}));

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText('search');

  return {
    input,
    ...utils,
    fillInput: testInput => fireEvent.change(input, { target: { value: testInput } }),
    getListItem: () => utils.getByTestId('suggestion-li'),
  };
};

const setupVersion2 = () => {
  const utils = render(
    <Provider value={{ version2: true }}>
      <App />
    </Provider>,
  );
  const input = utils.getByLabelText('search');

  return {
    input,
    ...utils,
    fillInput: testInput => fireEvent.change(input, { target: { value: testInput } }),
    getListItem: () => utils.getByTestId('suggestion-li'),
  };
};

test('input works', () => {
  const { input, fillInput } = setup();
  fillInput('a');
  expect(input.value).toBe('a');
});
test('when input string is under 3 char - no suggestions', () => {
  const { input, fillInput, getListItem } = setup();
  fillInput('Am');
  fireEvent.keyUp(input);
  // to be fixed
  expect(getListItem()).toBeEmpty();
});
test('when input string is 3 char and there are matches. show suggestions', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Ame');
  fireEvent.keyUp(input);
  // to be fixed
  expect(getListItem()).not.toBeEmpty();
});
test('when input string is 3 char and then 2 again. hide suggestions', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Am');
  fireEvent.keyUp(input);
  // to be fixed
  expect(getListItem()).toBeEmpty();
});
test('when a suggestion is clicked', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Ame');
  fireEvent.keyUp(input);
  // to be fixed
  fireEvent.click(getListItem());
  expect(input.value).toBe('Abyssinian'); // picked suggestion is placed into input field
  expect(getListItem()).toBeEmpty(); // suggestions are hidden after the click
});
test('when a suggestion is selected via enter', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Ame');
  expect(input.value).toBe('Ame');
  fireEvent.keyUp(input);
  // to be fixed
  // fireevent: focus selection. press enter. expect same result as above
  expect(input.value).toBe('Abyssinian');
  expect(getListItem()).toBeEmpty();
});
test('check bold suggestion text matches input', () => {
  const { input, fillInput } = setup();
  expect(getListItemBoldText()).toBe(input.text());
});
test('ensure input is focused', () => {
  const { getListItem } = setup();
  expect(getListItem()).toBeFocused(); // ?
});
test('version2: input works', () => {
  const { fillInput, input } = setupVersion2();
  fillInput('a');
  expect(input.value).toBe('a');
});
test('version2: when input string is under 3 char - no suggestions', () => {
  const { input, fillInput, getListItem } = setupVersion2();
  fillInput('Am');
  fireEvent.keyUp(input);
  // to be fixed
  expect(getListItem()).toBeEmpty();
});
test('version2:  when input string is 3 char and then 2 again. hide suggestions', () => {
  const { input, getListItem, fillInput } = setupVersion2();
  fillInput('Am');
  fireEvent.keyUp(input);
  // to be fixed
  expect(getListItem()).toBeEmpty();
});
test('version2: when a suggestion is clicked', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Ame');
  fireEvent.keyUp(input);
  // to be fixed
  fireEvent.click(getListItem());
  expect(input.value).toBe('Abyssinian'); // picked suggestion is placed into input field
  expect(getListItem()).not.toBeEmpty(); // suggestions are hidden after the click
});
test('version2: when a suggestion is selected via enter', () => {
  const { input, getListItem, fillInput } = setup();
  fillInput('Ame');
  expect(input.value).toBe('Ame');
  fireEvent.keyUp(input);
  // to be fixed
  // fireevent: focus selection. press enter. expect same result as above
  expect(input.value).toBe('Abyssinian');
  expect(getListItem()).not.toBeEmpty();
});
test('version2: ensure input is focused', () => {
  const { getListItem } = setup();
  expect(getListItem()).toBeFocused(); // ?
});
