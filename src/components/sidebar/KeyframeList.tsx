import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styling from './KeyframeList.module.css';

import { KeyframesContext, KeyframesDispatchContext } from '../../providers/KeyframesProvider';
import { KeyframeSelectionContext, KeyframeSelectionDispatchContext } from '../../providers/KeyframeSelectionProvider';

const KeyframeList: React.FC = () => {
  const keyframes = React.useContext(KeyframesContext);
  const keyframesDispatch = React.useContext(KeyframesDispatchContext);

  const selectedKeyframe = React.useContext(KeyframeSelectionContext);
  const selectedKeyframeDispatch = 
      React.useContext(KeyframeSelectionDispatchContext);
  
  const [ruleList, setRuleList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (keyframes.keyframes == null) {
      setRuleList([]);
    } else {
      let rules = [];
      for (let i = 0; i < keyframes.keyframes.length; i++) {
        rules.push(keyframes.keyframes[i].keyText);
      }
      rules.sort((a, b) => parseFloat(a) - parseFloat(b));
      setRuleList(rules);
    }
  }, [keyframes]);

  const handleClick = (e: React.MouseEvent, keyframe: string) => {
    e.preventDefault();
    selectedKeyframeDispatch({
      value: parseFloat(keyframe)
    });
  }

  const handleDelete = (e: React.MouseEvent, keyframe: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (keyframe !== '0%' && keyframe !== '100%') {
      keyframes.keyframes!.deleteRule(keyframe);
      keyframesDispatch({
        keyframes: keyframes.clone(),
        save: true
      });
      selectedKeyframeDispatch({value: -1});
    }
  }

  const getItemColor = (keyframe: string): string => {
    return keyframe == '0%' || keyframe == '100%' ? 
      styling.green : styling.blue;
  }

  return (
    <List>
      {ruleList.map(keyframe => (
        <ListItem disablePadding 
                  key={keyframe}
                  className={selectedKeyframe + '%' === keyframe 
                      ? 'selected' : ''}>
          <ListItemButton onClick={(e) => handleClick(e, keyframe)}
                          className={getItemColor(keyframe)}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={keyframe} />
            {keyframe !== '0%' && keyframe !== '100%' && (
              <IconButton size='small'
                    aria-label='Delete'
                    className='delete-icon'
                    onClick={(e) => handleDelete(e, keyframe)}>
                <CloseIcon></CloseIcon>
              </IconButton>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default KeyframeList;