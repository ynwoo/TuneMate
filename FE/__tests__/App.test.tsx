import 'react-native';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '@/App';

// Note: import explicitly to use the types shiped with jest.

// Note: test renderer must be required after react-native.
import '@testing-library/jest-native';

describe('App Test!!!!!', () => {
  it('renders correctly', () => {
    render(<App />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent(/tunemate/i);
  });
});
