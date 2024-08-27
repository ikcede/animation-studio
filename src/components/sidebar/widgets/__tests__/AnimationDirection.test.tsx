import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimationDirection from '../AnimationDirection';
import { CustomAnimation } from '@/model/CustomAnimation';

describe(AnimationDirection, () => {
  test('renders', () => {
    let customAnimation = new CustomAnimation();
    let onDirectionChange = jest.fn();
    render(
      <AnimationDirection animation={customAnimation}
                          onDirectionChange={onDirectionChange}
      ></AnimationDirection>
    );

    expect(screen.getByText('Direction:')).toBeInTheDocument();

    const forwards = screen.getByRole('button', {name: 'forwards'});
    const reverse = screen.getByRole('button', {name: 'backwards'});
    const alternate = screen.getByRole('button', {name: 'alternate'});

    expect(forwards).toBeInTheDocument();
    expect(reverse).toBeInTheDocument();
    expect(alternate).toBeInTheDocument();
  });

  describe('loads with state', () => {
    
    test('normal', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('normal');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      const forwards = screen.getByRole('button', {name: 'forwards'});
      const reverse = screen.getByRole('button', {name: 'backwards'});
      const alternate = screen.getByRole('button', {name: 'alternate'});
  
      expect(forwards).toHaveAttribute('aria-pressed', 'true');
      expect(reverse).toHaveAttribute('aria-pressed', 'false');
      expect(alternate).toHaveAttribute('aria-pressed', 'false');
    });

    test('reverse', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('reverse');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      const forwards = screen.getByRole('button', {name: 'forwards'});
      const reverse = screen.getByRole('button', {name: 'backwards'});
      const alternate = screen.getByRole('button', {name: 'alternate'});
  
      expect(forwards).toHaveAttribute('aria-pressed', 'false');
      expect(reverse).toHaveAttribute('aria-pressed', 'true');
      expect(alternate).toHaveAttribute('aria-pressed', 'false');
    });

    test('normal alternate', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('alternate');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      const forwards = screen.getByRole('button', {name: 'forwards'});
      const reverse = screen.getByRole('button', {name: 'backwards'});
      const alternate = screen.getByRole('button', {name: 'alternate'});
  
      expect(forwards).toHaveAttribute('aria-pressed', 'true');
      expect(reverse).toHaveAttribute('aria-pressed', 'false');
      expect(alternate).toHaveAttribute('aria-pressed', 'true');
    });

    test('reverse alternate', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('alternate-reverse');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      const forwards = screen.getByRole('button', {name: 'forwards'});
      const reverse = screen.getByRole('button', {name: 'backwards'});
      const alternate = screen.getByRole('button', {name: 'alternate'});
  
      expect(forwards).toHaveAttribute('aria-pressed', 'false');
      expect(reverse).toHaveAttribute('aria-pressed', 'true');
      expect(alternate).toHaveAttribute('aria-pressed', 'true');
    });

    test('other values', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('other');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      const forwards = screen.getByRole('button', {name: 'forwards'});
      const reverse = screen.getByRole('button', {name: 'backwards'});
      const alternate = screen.getByRole('button', {name: 'alternate'});
  
      expect(forwards).toHaveAttribute('aria-pressed', 'true');
      expect(reverse).toHaveAttribute('aria-pressed', 'false');
      expect(alternate).toHaveAttribute('aria-pressed', 'false');
    });

  });

  describe('calls change function with new states', () => {

    test('normal and reverse', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('normal');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      expect(onDirectionChange).toHaveBeenCalledTimes(0);

      const reverse = screen.getByRole('button', {name: 'backwards'});
      await userEvent.click(reverse);
      expect(reverse).toHaveAttribute('aria-pressed', 'true');
      expect(onDirectionChange).toHaveBeenCalledWith('reverse');

      const forwards = screen.getByRole('button', {name: 'forwards'});
      await userEvent.click(forwards);
      expect(forwards).toHaveAttribute('aria-pressed', 'true');
      expect(onDirectionChange).toHaveBeenCalledWith('normal');

      expect(onDirectionChange).toHaveBeenCalledTimes(2);
    });

    test('alternate', async () => {
      let customAnimation = new CustomAnimation();
      customAnimation.setDirection('normal');
      let onDirectionChange = jest.fn();
      render(
        <AnimationDirection animation={customAnimation}
                            onDirectionChange={onDirectionChange}
        ></AnimationDirection>
      );
  
      expect(onDirectionChange).toHaveBeenCalledTimes(0);

      const alternate = screen.getByRole('button', {name: 'alternate'});
      await userEvent.click(alternate);
      expect(alternate).toHaveAttribute('aria-pressed', 'true');
      expect(onDirectionChange).toHaveBeenCalledWith('alternate');

      const reverse = screen.getByRole('button', {name: 'backwards'});
      await userEvent.click(reverse);
      expect(reverse).toHaveAttribute('aria-pressed', 'true');
      expect(alternate).toHaveAttribute('aria-pressed', 'true');
      expect(onDirectionChange).toHaveBeenCalledWith('alternate-reverse');

      expect(onDirectionChange).toHaveBeenCalledTimes(2);
    });

  });

})