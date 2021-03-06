import { screen, render } from '@testing-library/react';
import Repos from '../Repos';
import { IRepo } from '../types';

describe('Rendering data', () => {
  const mockRepos: IRepo[] = [
    {
      name: 'test1',
      description: 'desc1',
      htmlUrl: '/',
      id: 1,
    },
    {
      name: 'test2',
      description: 'desc2',
      htmlUrl: '/',
      id: 2,
    },
    {
      name: 'test3',
      description: 'desc3',
      htmlUrl: '/',
      id: 3,
    },
    {
      name: 'test4',
      description: 'desc4',
      htmlUrl: '/',
      id: 4,
    },
  ];

  it('Renders repos', () => {
    render(<Repos totalReposCount={mockRepos.length} repos={mockRepos} />);

    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.description)).toBeInTheDocument();
    });
  });
});
