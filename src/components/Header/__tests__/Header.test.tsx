import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import Header from '../Header';

describe('Search', () => {
  it('Calls search callback on enter key press', () => {
    const mockSearchCallback = jest.fn();

    render(<Header onSearch={mockSearchCallback} />);

    userEvent.type(screen.getByRole('textbox'), 'testquery');

    keyboard('{Enter}');

    expect(mockSearchCallback).toHaveBeenCalled();
  });

  it('Calls search callback with the correct query', () => {
    const mockSearchCallback = jest.fn();

    render(<Header onSearch={mockSearchCallback} />);

    userEvent.type(screen.getByRole('textbox'), 'testquery');

    keyboard('{Enter}');

    expect(mockSearchCallback).toHaveBeenCalledWith('testquery');
  });

  it('Does not call search callback when the query is empty', () => {
    const mockSearchCallback = jest.fn();

    render(<Header onSearch={mockSearchCallback} />);

    keyboard('{Enter}');

    expect(mockSearchCallback).not.toHaveBeenCalled();
  });
});
