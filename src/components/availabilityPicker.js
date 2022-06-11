import React, { useState } from "react";
import AvailabilityTable from "./availabilityTable";

const AvailabilityPicker = ({ days, timeRange, othersAvailability }) => {
  const [state, setState] = useState({
    showEveryone: false,
    userAvailability: {},
  })

  const handleAvail = (e) => {
    console.log(2);
    if (e.target.className === "availability-table-cell") {
      console.log(1)
      setUserAvail(e.target.starttime, 0);
    }
  };

  const toggleShowEveryone = () => {
    setState({
      showEveryone: !state.showEveryone,
      ...state
    })
  }

  const setUserAvail = (startTime, avail) => {
    setState({
      userAvailability: {
        startTime: avail,
        ...state.userAvailability
      },
      ...state
    })
  }

  return (
    <>
      <link rel="stylesheet" href="availabilityPicker.css" />
      <AvailabilityTable
        days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        timeRange={{
          start: 8,
          end: 17,
        }}
        timeUnit={1}
        onClick={() => { console.log(3) }}
      />
    </>
  );
};

export default AvailabilityPicker;
