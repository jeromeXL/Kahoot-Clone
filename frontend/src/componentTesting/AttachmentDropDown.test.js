import React from 'react';
import { render, screen } from '@testing-library/react';
import AttachmentDropDown from '../components/EditGame/AttachmentDropDown';
import userEvent from '@testing-library/user-event';

describe('AttachmentDropDown', () => {
  it('renders with default selected (no attachment)', () => {
    render(<AttachmentDropDown/>)
    expect(screen.getByDisplayValue('No attachment')).toBeInTheDocument();
  })

  it('renders with link option selected', () => {
    render(<AttachmentDropDown defaultValue='link'/>)
    expect(screen.getByDisplayValue('Youtube Link')).toBeInTheDocument();
  })

  it('renders with image option selected', () => {
    render(<AttachmentDropDown defaultValue='img'/>)
    expect(screen.getByDisplayValue('Image')).toBeInTheDocument();
  })

  it('can change selected option', () => {
    render(<AttachmentDropDown/>)
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Link option
      screen.getByRole('option', { name: /Youtube Link/i }),
    )
    expect(screen.getByRole('option', { name: /Youtube Link/i }).selected).toBe(true)

    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Image option
      screen.getByRole('option', { name: /Image/i }),
    )
    // userEvent.selectOptions(screen.getByRole('combobox'), 'img')
    expect(screen.getByRole('option', { name: /Image/i }).selected).toBe(true)
  })

  it('changing fires an onChange event', () => {
    const onChange = jest.fn();
    render(<AttachmentDropDown onChange={onChange}/>)
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and select the Link option
      screen.getByRole('option', { name: /Youtube Link/i }),
    )
    expect(onChange).toHaveBeenCalledTimes(1);
  })

  it('doesnt change selected option and onChange does not fire when it is disabled', () => {
    const onChange = jest.fn();
    render(<AttachmentDropDown disabled onChange={onChange}/>)
    userEvent.selectOptions(
      // Find the select element
      screen.getByRole('combobox'),
      // Find and try select the Link option
      screen.getByRole('option', { name: /Youtube Link/i }),
    )
    expect(screen.getByRole('option', { name: /No attachment/i }).selected).toBe(true)
    expect(screen.getByRole('option', { name: /Youtube Link/i }).selected).toBe(false)
    expect(onChange).toHaveBeenCalledTimes(0);
  })
})
