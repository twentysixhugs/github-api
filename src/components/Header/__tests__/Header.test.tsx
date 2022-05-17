import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

describe('Search', () => {
  it('Calls search callback on enter key press', () => {
    const mockSearchCallback = jest.fn();

    render(<Header onSearch={mockSearchCallback} />);

    userEvent.type(screen.getByRole('textbox'), 'testquery');

    userEvent.keyboard('{Enter}');

    expect(mockSearchCallback).toHaveBeenCalled();
  });

  it('Calls search callback with the correct query', () => {
    const mockSearchCallback = jest.fn();

    render(<Header onSearch={mockSearchCallback} />);

    userEvent.type(screen.getByRole('textbox'), 'testquery');

    userEvent.keyboard('{Enter}');

    expect(mockSearchCallback).toHaveBeenCalledWith('testquery');
  });
});
