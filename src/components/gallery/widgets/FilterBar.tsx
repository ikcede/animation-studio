import React from 'react';
import styling from './FilterBar.module.css';
import Button from '@mui/material/Button';

export interface FilterBarProps {
  filters: string[],
  onFilterSelect: FilterSelectedFunction,
}

type FilterSelectedFunction = (filter: string) => void;

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterSelect,
}) => {

  return (
    <div className={styling.wrapper}>
      {filters.map(filter => (
        <Button key={filter}
                className='button'
                size='small'
                onClick={() => onFilterSelect(filter)}>
          {filter}
        </Button>
      ))}
    </div>
  )
}

export default FilterBar