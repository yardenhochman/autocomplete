import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
// import axiosMock from 'axios';
import App from './components/SearchPage';

// jest.mock('axios');

// const data = [

// ];
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
  };
};

test('input works', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'aaa' } });
  expect(input.value).toBe('aaa');
});
test('when input string is under 3 char - no suggestions', async () => {
  const { input, getByTestId } = setup();
  fireEvent.change(input, { target: { value: 'Am' } });
  expect(input.value).toBe('Am');
  fireEvent.keyUp(input);
  // axiosMock.get.mockResolvedValueOnce({
  //   data,
  // });
  const res = getByTestId('suggestions-list');
  console.log(res);
});

// test('renders learn react link', () => {
//   const SearchPage = render(<App />);
//   const input = SearchPage.getByLabelText('search');
//   console.log(input);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });
