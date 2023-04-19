import React from 'react';
import { render, screen } from '@testing-library/react';
import FloatingInput from '../components/General/FloatingInput';
import userEvent from '@testing-library/user-event';

describe('FloatingInput', () => {
  it('renders with custom label', () => {
    render(<FloatingInput type="text" controlId="testFloatingInput" labelControlId="floatingInput" label="label here" placeholder="Enter text"/>)
    expect(screen.getByLabelText('label here')).toBeInTheDocument();
  })

  it('renders with custom place holder', () => {
    render(<FloatingInput type="text" controlId="testFloatingInput" labelControlId="floatingInput" label="label here" placeholder="Enter text"/>)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  })

  it('triggers an onChange when typed in', () => {
    const onChange = jest.fn();
    render(<FloatingInput type="text" controlId="testFloatingInput" labelControlId="floatingInput" label="label here" placeholder="Enter text" onChange={onChange}/>)
    userEvent.type(screen.getByRole('textbox'), 'foo')
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(screen.getByRole('textbox')).toHaveValue('foo')
  })
})
