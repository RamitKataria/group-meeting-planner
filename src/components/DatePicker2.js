import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';
import "../css/datePicker2.css"
import '@natscale/react-calendar/dist/main.css';

export default function DatePicker2() {
	const [value, setValue] = useState([]);

	const onChange = useCallback(
		(val) => {
			setValue(val);
			},
		[setValue],
	);


	const getMonthName = (num) => {
		switch (num) {
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "Jul";
			case 7:
				return "Aug";
			case 8:
				return "Sep";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			default:
				return "Dec";
		}
	}

	return (
		<div className="div">
			<Calendar size={360} showDualCalendar isRangeSelector value={value} onChange={onChange}/>
			<h2>Date Range Chosen:</h2>
			{value.length !== 0 ? (
				<p>{getMonthName(value[0].getMonth()) + " " + value[0].getDate() + ", " + value[0].getFullYear()}</p>
			) : null}
			{value.length !== 0 ? (
				<p>{getMonthName(value[1].getMonth()) + " " + value[1].getDate() + ", " + value[1].getFullYear()}</p>
			) : null}
		</div>

	);
}