import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../components/General/SubmitButton';
import userEvent from '@testing-library/user-event';

describe('SubmitButton', () => {
  it('renders with custom title', () => {
    render(<SubmitButton>Log Out</SubmitButton>)
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  })

  it('renders with custom colour', () => {
    render(<SubmitButton color='blue'>Log Out</SubmitButton>)
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  })

  it('renders with custom hex colour', () => {
    render(<SubmitButton color='#475A81'>Log Out</SubmitButton>)
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  })

  it('triggers an onClick when clicked', () => {
    const onClick = jest.fn();
    render(<SubmitButton onClick={onClick}>Click Me!</SubmitButton>);
    userEvent.click(screen.getByRole('button', { name: /click me!/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  })
})
