import {useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const toggleStates = ['Range', 'Dates']

export default function CalendarToggles(props) {

  const handleChange = (event, newState) => {
    props.setState(newState);
  };

  return (
    <ToggleButtonGroup
      value={props.toggleState}
      exclusive
      onChange={handleChange}
      aria-label="date selection mode"
    >
      <ToggleButton value={toggleStates[0]} aria-label="select range">
        <p>Range</p>
      </ToggleButton>
      <ToggleButton value={toggleStates[1]} aria-label="select individual dates">
        <p>Dates</p>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
