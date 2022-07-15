import React from "react";

const AvailabilityPeriod = ({ start, duration, processSelection, selected }) => {
    return (
        <>
            <td className={"availability-table-cell" + (selected ? " selected" : "")}
                onMouseEnter={processSelection} id={start}>
            </td>
        </>
    );
};

export default AvailabilityPeriod;
