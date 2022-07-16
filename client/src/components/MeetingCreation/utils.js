export function roundToHour(timeStr) {
    let time = timeStr.split(':');
    if (time[1] !== '00') {
        time[1] = '00';
    }
    return time[0] + ':' + time[1];
}
export function sliderTime(timeStr) {
    return Number(timeStr.split(':')[0]);
}
export function sliderTimeToString(sliderTime) {
    let timeStr = sliderTime + ':00';
    timeStr = ((sliderTime / 10) < 1) ? ('0' + timeStr) : timeStr;

    return timeStr;
}   

// TODO: update user state
export function creationSliceToInstance(state) {
    const creationTime = new Date();
    const user = state['currUser'] === "" ? "Guest" : state['currUser'];
    return {
        name: state['name'],
        description: "A non-descript event? ", // TODO
        dateTimeCreated: creationTime.getTime(),
        dateTimeUpdated: creationTime.getTime(),
        createdBy: user,
        range: convertToRange(state['dates'], state['startTime'], state['endTime']),
        usersAvailability: [
            {
                name: user,
                availableSlots: [],
            }
        ],
    }
}

function convertToRange(dates, startHour, endHour) {
    const dateTimeArr = [];
    for (const date of dates) {
        const start = new Date(date);
        start.setHours(startHour, 0, 0)
        const end = new Date(date);
        end.setHours(endHour, 0, 0)
        dateTimeArr.push([
            start.getTime(), 
            end.getTime()
        ]);
    }

    return dateTimeArr;
}