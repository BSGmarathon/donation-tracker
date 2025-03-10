import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { getFixturePrize } from '@spec/fixtures/Prize';
import { mockState, renderWithState } from '@spec/Suite';

import PrizeCard from './PrizeCard';

describe('PrizeCard', () => {
  let subject;

  beforeEach(() => {
    mockState({ prizes: { loading: false, prizes: { 123: getFixturePrize({ imageFile: 'foo' }) } } });
  });

  it('displays "No Image Found" if an error occurs while loading the image', () => {
    subject = render();

    fireEvent.error(subject.queryByRole('img')!);
    expect(subject.queryByRole('img')).toBeNull();
    expect(subject.getByText('No Image Provided')).not.toBeNull();
  });

  function render(props = {}) {
    const defaultProps = {
      prizeId: '123',
      currency: 'USD',
    };

    return renderWithState(
      <MemoryRouter>
        <PrizeCard {...defaultProps} {...props} />
      </MemoryRouter>,
    );
  }
});
