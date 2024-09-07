import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the creator information', () => {
    const creatorLink = screen.getByRole('link', { name: /ikcede/i });
    expect(creatorLink).toBeInTheDocument();
    expect(creatorLink).toHaveAttribute(
      'href',
      'https://github.com/ikcede'
    );
    expect(creatorLink).toHaveAttribute('target', '_blank');
  });

  it('displays the license information', () => {
    const licenseLink = screen.getByRole('link', { name: /GPL-3.0/i });
    expect(licenseLink).toBeInTheDocument();
    expect(licenseLink).toHaveAttribute(
      'href',
      'https://www.gnu.org/licenses/gpl-3.0.en.html'
    );
    expect(licenseLink).toHaveAttribute('target', '_blank');
  });

  it('displays the GitHub repository link', () => {
    const repoLink = screen.getByRole('link', { name: /Github repo/i });
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute(
      'href',
      'https://github.com/ikcede/animation-studio'
    );
    expect(repoLink).toHaveAttribute('target', '_blank');
  });

  it('contains all three information sections', () => {
    const items = screen.getAllByText(/Built by:|License:|Check out the/);
    expect(items).toHaveLength(3);
  });
});
