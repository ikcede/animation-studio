import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KeyframeControls from '../KeyframeControls';
import styling from '../KeyframeControls.module.css';
import userEvent from '@testing-library/user-event';

describe('KeyframeControls', () => {
  const user = userEvent.setup();

  it('renders without crashing', () => {
    render(<KeyframeControls />);
    expect(
      screen.getByRole('button', { name: 'Add keyframe' })
    ).toBeInTheDocument();
  });

  it('does not show delete button when no keyframe is selected', () => {
    render(<KeyframeControls />);
    expect(
      screen.queryByRole('button', { name: 'Delete keyframe' })
    ).not.toBeInTheDocument();
  });

  it('shows delete button when a keyframe is selected', () => {
    render(<KeyframeControls keyframeSelected={true} />);
    expect(
      screen.getByRole('button', { name: 'Delete keyframe' })
    ).toBeInTheDocument();
  });

  it('applies enabled class to add button when in add mode', () => {
    render(<KeyframeControls addMode={true} />);
    expect(
      screen.getByRole('button', { name: 'Add keyframe' })
    ).toHaveClass(styling.enabled);
  });

  it('does not apply enabled class to add button when not in add mode', () => {
    render(<KeyframeControls addMode={false} />);
    expect(
      screen.getByRole('button', { name: 'Add keyframe' })
    ).not.toHaveClass(styling.enabled);
  });

  it('calls onAddKeyframe when add button is clicked', async () => {
    const mockAddKeyframe = jest.fn();
    render(<KeyframeControls onAddKeyframe={mockAddKeyframe} />);
    await user.click(screen.getByRole('button', { name: 'Add keyframe' }));
    expect(mockAddKeyframe).toHaveBeenCalledTimes(1);
  });

  it('calls onDeleteKeyframe when delete button is clicked', async () => {
    const mockDeleteKeyframe = jest.fn();
    render(
      <KeyframeControls
        keyframeSelected={true}
        onDeleteKeyframe={mockDeleteKeyframe}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Delete keyframe' })
    );
    expect(mockDeleteKeyframe).toHaveBeenCalledTimes(1);
  });
});
