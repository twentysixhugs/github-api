import { screen, render } from '@testing-library/react';
import UserInfo from '../UserInfo';

describe('Stats rendering', () => {
  const mockName = 'test name';
  const mockLogin = 'test login';
  const mockUrl = '/';

  it("Renders 'followers' if their number is not 1", () => {
    const mockFollowers = 3;
    const mockFollowing = 3;

    render(
      <UserInfo
        name={mockName}
        login={mockLogin}
        followersCount={mockFollowers}
        followingCount={mockFollowing}
        htmlUrl={mockUrl}
        avatarUrl={mockUrl}
      />,
    );

    expect(screen.getByText(/followers/i)).toBeInTheDocument();
  });

  it('Shows thousands in num+k format (e.g. 65.8k)', () => {
    const mockFollowers = 65815;
    const mockFollowing = 176815;

    render(
      <UserInfo
        name={mockName}
        login={mockLogin}
        followersCount={mockFollowers}
        followingCount={mockFollowing}
        htmlUrl={mockUrl}
        avatarUrl={mockUrl}
      />,
    );

    expect(screen.getByText('65.8k followers')).toBeInTheDocument();
    expect(screen.getByText('176.8k following')).toBeInTheDocument();
  });
});
