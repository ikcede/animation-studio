import { CustomAnimation } from '@/model/CustomAnimation';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EscalatorOutlinedIcon from '@mui/icons-material/EscalatorOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styling from './AnimationTiming.module.css';
import TextField from '@mui/material/TextField';
import { BezierEditor, CubicBezier } from 'ts-bezier-easing-editor';

type TimingChangeFunction = (timing: string) => void;

const initialBezier: [string, string, string, string] = [
  '0.25',
  '0.25',
  '0.75',
  '0.75',
];

const animationTypes = [
  {
    type: 'text',
    icon: <TextFieldsIcon />,
  },
  {
    type: 'bezier',
    icon: <EscalatorOutlinedIcon />,
  },
  {
    type: 'step',
    icon: <SkipNextIcon />,
  },
];

const bezierLabels = ['x1', 'y1', 'x2', 'y2'];

const textTimingMap: {
  [key: string]: [string, string, string, string];
} = {
  linear: ['0.25', '0.25', '0.75', '0.75'],
  ease: ['0.25', '0.1', '0.25', '1'],
  'ease-in': ['0.42', '0', '1', '1'],
  'ease-out': ['0', '0', '0.58', '1'],
  'ease-in-out': ['0.42', '0', '0.58', '1'],
};

const stepTypes = ['jump-end', 'jump-start', 'jump-none', 'jump-both'];

export interface AnimationTimingProps {
  animation?: CustomAnimation;
  onTimingChange?: TimingChangeFunction;
}

const AnimationTiming: React.FC<AnimationTimingProps> = ({
  animation,
  onTimingChange = () => {},
}) => {
  const [type, setType] = React.useState('text');
  const [textSelection, setTextSelection] = React.useState('linear');

  const [bezier, setBezier] = React.useState(initialBezier);
  const [readOnlyBezier, setReadOnlyBezier] =
    React.useState(initialBezier);

  const [stepValue, setStepValue] = React.useState('1');
  const [stepType, setStepType] = React.useState(stepTypes[0]);

  const isBezierValid = React.useCallback(() => {
    return !Number.isNaN(bezier.map(parseFloat).reduce((p, c) => p + c));
  }, [bezier]);

  const buildBezierValue = React.useCallback(() => {
    return `cubic-bezier(${bezier[0]}, ${bezier[1]}, ${bezier[2]}, ${bezier[3]})`;
  }, [bezier]);

  const changeType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType !== null) {
      setType(newType);

      if (newType === 'text') {
        onTimingChange(textSelection);
        if (textTimingMap[textSelection] !== undefined) {
          setReadOnlyBezier(textTimingMap[textSelection]);
        }
      } else if (newType === 'bezier' && isBezierValid()) {
        onTimingChange(buildBezierValue());
      } else if (newType === 'step') {
        onTimingChange(buildStepValue());
      }
    }
  };

  const changeTextSelection = (event: SelectChangeEvent) => {
    let newSelection = event.target.value;
    setTextSelection(newSelection);
    onTimingChange(newSelection);

    if (textTimingMap[newSelection] !== undefined) {
      setBezier(textTimingMap[newSelection]);
      setReadOnlyBezier(textTimingMap[newSelection]);
    }
  };

  const changeBezierValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    bezier[index] = e.target.value;
    setBezier([...bezier]);

    if (isBezierValid()) {
      onTimingChange(buildBezierValue());
    }
  };

  const bezierEdit = (bezier?: CubicBezier) => {
    if (bezier === undefined) {
      return;
    }

    setBezier(bezier.toStringArray());

    if (bezier.isLinear()) {
      onTimingChange('linear');
    } else {
      onTimingChange(buildBezierValue());
    }
  };

  const changeStepValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStepValue(e.target.value);
  };

  const changeStepType = (event: SelectChangeEvent) => {
    let newSelection = event.target.value;
    setStepType(newSelection);
    onTimingChange(buildStepValue());
  };

  const buildStepValue = React.useCallback(() => {
    return 'steps(' + parseInt(stepValue) + ', ' + stepType + ')';
  }, [stepValue, stepType]);

  const getBezier = React.useCallback(() => {
    if (type !== 'bezier') {
      return CubicBezier.fromStringArray(readOnlyBezier) || undefined;
    }
    return CubicBezier.fromStringArray(bezier) || undefined;
  }, [bezier, readOnlyBezier, type]);

  /// Load the correct animation timing type value
  React.useEffect(() => {
    if (animation !== undefined) {
      let bezierRegex = /^cubic-bezier\((.*)\)/g;
      let stepRegex = /^steps\((.*)\)/g;

      let bezierMatch = bezierRegex.exec(animation.timing);
      let stepMatch = stepRegex.exec(animation.timing);

      // Check for cubic-bezier(...)
      if (bezierMatch && bezierMatch[1] !== undefined) {
        let values = bezierMatch[1].split(',');

        if (values.length == 4) {
          setBezier((oldBezier) => {
            for (let i = 0; i < 4; i++) {
              oldBezier[i] = values[i].trim();
            }
            return [...oldBezier];
          });
          setType(animationTypes[1].type);
        }
      }

      // Check for steps(...)
      else if (stepMatch && stepMatch[1] !== undefined) {
        let values = stepMatch[1].split(',');

        if (values.length == 2) {
          setStepValue(values[0].trim());
          setStepType(values[1].trim());
          setType(animationTypes[2].type);
        }
      } else {
        setType(animationTypes[0].type);
        setTextSelection(animation.timing);
        if (textTimingMap[animation.timing] !== undefined) {
          setBezier(textTimingMap[animation.timing]);
          setReadOnlyBezier(textTimingMap[animation.timing]);
        }
      }
    }
  }, []);

  return (
    <>
      <div className="input-row">
        <label>Timing:</label>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={changeType}
          aria-label="Iteration types"
        >
          {animationTypes.map((type) => (
            <ToggleButton
              key={type.type}
              value={type.type}
              aria-label={type.type}
              size="small"
            >
              {type.icon}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {type === 'text' && (
        <div className="input-row">
          <label>Timing Value:</label>
          <Select
            className={styling.select}
            value={textSelection}
            aria-label="variant"
            onChange={changeTextSelection}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            {Object.keys(textTimingMap).map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      {type === 'bezier' && (
        <div className="input-row">
          <label>Bezier:</label>

          {bezier.map((val, index) => (
            <TextField
              className={styling['number-input']}
              aria-label={bezierLabels[index]}
              key={bezierLabels[index]}
              value={val}
              onChange={(e) => changeBezierValue(e, index)}
            />
          ))}
        </div>
      )}

      {(type === 'text' || type === 'bezier') && (
        <BezierEditor
          bezier={getBezier()}
          width={250}
          height={250}
          onChange={bezierEdit}
          readOnly={type !== 'bezier'}
        ></BezierEditor>
      )}

      {type === 'step' && (
        <div className="input-row">
          <label>Step:</label>
          <TextField
            className={styling['number-input']}
            value={stepValue}
            onChange={changeStepValue}
          ></TextField>
          <Select
            className={styling.select}
            value={stepType}
            aria-label="variant"
            onChange={changeStepType}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            {stepTypes.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

export default AnimationTiming;
