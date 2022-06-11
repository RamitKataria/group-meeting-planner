import React, { useState } from "react";

const AvailabilityPeriod = ({ start, duration }) => {
  const [state, setState] = useState('-');
  const toggleValue = () => {
    setState(state == '-' ? '+' : '-')
  }
  return (
    <td onDrag={toggleValue} onClick={toggleValue}>{state}</td>
  );
};

export default AvailabilityPeriod;
