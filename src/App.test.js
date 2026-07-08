import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the loading screen on mount', () => {
  render(<App />);
  expect(screen.getByRole('status', { name: /loading portfolio/i })).toBeInTheDocument();
  expect(screen.getByText('AJAV')).toBeInTheDocument();
});
