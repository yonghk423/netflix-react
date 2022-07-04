import {render, screen} from '@testing-library/react';
import React from 'react';
import App from './app';
test('renders learn react link', () => {
    render(<App />)
    const LinkElement = screen.getByAltText(/learn react/i);
    expect(LinkElement).toBeInTheDocument();
})
