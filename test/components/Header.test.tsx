import React from 'react';
import { create } from 'react-test-renderer';
import { Header } from '../../src/components';

describe('Header', () => {
  test('Header renders properly', () => {
    const component = create(<Header />).toJSON();

    expect(component.type).toBe('div');
  });
});
