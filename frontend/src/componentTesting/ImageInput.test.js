import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageInput from '../components/EditGame/ImageInput';
import userEvent from '@testing-library/user-event';

describe('ImageInput', () => {
  it('renders', () => {
    render(<ImageInput/>)
    expect(screen.getByLabelText('Upload Image')).toBeInTheDocument();
  })

  it('Can upload image file', () => {
    render(<ImageInput/>)
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload image/i);
    userEvent.upload(input, file)
    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  })

  it('Can only upload one image file', () => {
    render(<ImageInput/>)
    const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });
    const file2 = new File(['goodbye'], 'goodbye.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload image/i);
    userEvent.upload(input, file1)
    expect(input.files[0]).toStrictEqual(file1);
    expect(input.files.item(0)).toStrictEqual(file1);
    expect(input.files).toHaveLength(1);
    // Second upload should replace first file
    userEvent.upload(input, file2)
    expect(input.files[0]).toStrictEqual(file2);
    expect(input.files.item(0)).toStrictEqual(file2);
    expect(input.files).toHaveLength(1);
  })

  it('Triggers onChange event', () => {
    const onChange = jest.fn();
    render(<ImageInput onChange={onChange}/>)
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload image/i);
    userEvent.upload(input, file);
    expect(onChange).toHaveBeenCalledTimes(1);
  })
})
