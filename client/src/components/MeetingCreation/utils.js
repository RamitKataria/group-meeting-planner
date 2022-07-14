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

export function creationSliceToInstance(state) {
    const dateTime = new Date();
    const user = state['currUser'] == "" ? "Guest" : state['currUser'];
    return {
        name: state['name'],
        dateTimeCreated: dateTime.toString(),
        dateTimeUpdated: dateTime.toString(),
        createdBy: user,
        dateRange: state['dates'],
        timeRange: [state['startTime'], state['endTime']],
        usersAvailability: [
            {
                name: user,
                availableSlots: [],
            }
        ],
        description: "Enter Descriptions", // TODO
    }
}