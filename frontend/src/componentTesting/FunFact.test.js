import React from 'react';
import { render, screen, within } from '@testing-library/react';
import FunFacts, { facts } from '../components/FunFacts/FunFacts';

describe('FunFacts', () => {
  it('can render', () => {
    render(<FunFacts/>)
    expect(screen.getByTestId('FunFacts-element')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Fun Fact:' })).toBeInTheDocument();
  })

  it('renders with one of the provide facts', () => {
    render(<FunFacts/>)
    const container = screen.getByTestId('FunFacts-element');
    let found = false;
    // go through each fun fact and check if that fact is the text.
    for (const fact of facts) {
      const funFact = within(container).queryByText(fact);
      if (funFact !== null) {
        found = true;
      }
    }
    expect(found).toBeTruthy();
  })
})
