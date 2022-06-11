import React from "react";
import AvailabilityPeriod from "./availabilityPeriod";

const AvailabilityTable = ({ days, timeRange, timeUnit }) => {
  

  const periods = []
  for (let period = timeRange.start; period <= timeRange.end - timeUnit; period += timeUnit) {
    periods.push(period);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          {days.map((d, i) => <th key={i}>{d}</th>)}
        </tr>
      </thead>
      <tbody>
        {periods.map((pStart, i) => (
          <tr key={i}>
            <th>{pStart}</th>
            {days.map((d, j) => (
              <AvailabilityPeriod key={(i, j)} start={pStart} duration={1} availability={1}/>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AvailabilityTable;
