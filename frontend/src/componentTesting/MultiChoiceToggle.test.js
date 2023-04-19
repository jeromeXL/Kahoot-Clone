import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiChoiceToggle from '../components/EditGame/MultiChoiceToggle';

describe('MultiChoiceToggle', () => {
  it('renders', () => {
    render(<MultiChoiceToggle/>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  })

  it('can be switched', () => {
    render(<MultiChoiceToggle/>)
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('triggers an onChange event', () => {
    const onChange = jest.fn();
    render(<MultiChoiceToggle onChange={onChange}/>)
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1);
  })

  it('can start as checked', () => {
    render(<MultiChoiceToggle defaultChecked/>);
    expect(screen.getByRole('checkbox')).toBeChecked()
    userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('can be disabled, and not change state when pressed', () => {
    const onChange = jest.fn();
    render(<MultiChoiceToggle disabled onChange={onChange}/>);
    userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled();
  })
})
