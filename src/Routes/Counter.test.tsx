import { render, screen } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';

describe('Counter test', () => {
  it('should render Counter', () => {
    render(<Counter />);

    // 두 쿼리 모두 같은 element 탐색(문자열 대신 정규식 탐색도 가능)
    screen.getByRole('button', { name: '+' });
    screen.getByText('+');
  });
});