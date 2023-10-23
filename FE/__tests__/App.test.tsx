import 'react-native';
import React from 'react';
import App from '@/App';

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import { render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native';

describe('App Test!!!!!', () => {
  it('renders correctly', () => {
    render(<App />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent(/tunemate/i);
  });
});
