import React, { useState } from "react";

const AvailabilityPeriod = ({ start, availability }) => {
  return (
    <td>
      <div className="availability-table-cell" style={{ backgroundColor: `rgba(0, 96, 100, ${availability})` }} starttime={start}/>
    </td>
  );
};

export default AvailabilityPeriod;
