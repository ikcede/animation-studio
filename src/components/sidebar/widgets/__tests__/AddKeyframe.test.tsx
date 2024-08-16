import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddKeyframe from '../AddKeyframe';

describe(AddKeyframe, () => {
  test('renders', () => {
    let onKeyframeAdd = jest.fn();
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
      ></AddKeyframe>
    );

    const btn = screen.getByRole('button');
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('ignores add if no input', async () => {
    let onKeyframeAdd = jest.fn();
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
      ></AddKeyframe>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    const btn = screen.getByRole('button');
    await userEvent.click(btn);

    expect(onKeyframeAdd).toHaveBeenCalledTimes(0);
  });

  test('adds keyframe on enter', async () => {
    let onKeyframeAdd = jest.fn();
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
      ></AddKeyframe>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await userEvent.type(input, '10');
    expect(input).toHaveValue('10');

    await userEvent.keyboard('{Enter}');
    expect(onKeyframeAdd).toHaveBeenCalled();
  });

  test('adds keyframe on click', async () => {
    let onKeyframeAdd = jest.fn();
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
      ></AddKeyframe>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await userEvent.type(input, '10');
    expect(input).toHaveValue('10');

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(onKeyframeAdd).toHaveBeenCalled();
  });

  test('renders with error', async () => {
    let onKeyframeAdd = jest.fn();
    let error = 'test';
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
                   error={error}
      ></AddKeyframe>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('typing clears error', async () => {
    let onKeyframeAdd = jest.fn();
    let error = 'test';
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
                   error={error}
      ></AddKeyframe>
    );

    expect(screen.getByText('test')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '10');
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  test('errors submitting bad input', async () => {
    let onKeyframeAdd = jest.fn();
    render(
      <AddKeyframe onAddKeyframe={onKeyframeAdd}
      ></AddKeyframe>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    await userEvent.type(input, 'bad');
    expect(input).toHaveValue('bad');

    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(onKeyframeAdd).toHaveBeenCalledTimes(0);

    expect(screen.getByText('Enter a valid number'))
      .toBeInTheDocument();
  });

})