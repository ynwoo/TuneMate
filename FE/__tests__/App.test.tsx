/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '@/App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

describe('App Test!!!!!', () => {
  it('renders correctly1', () => {
    renderer.create(<App />);
  });
  it('renders correctly2', () => {
    render(<App />);
  });
});
