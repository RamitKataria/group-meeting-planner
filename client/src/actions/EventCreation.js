export const setDates = (startDate, endDate) => {
    const payload = [startDate.toString(), endDate.toString()]
    return {
        type: "EventCreation/SetDate",
        payload: payload
    }
}

export const setDate = (date) => {
    const payload = date.toString()
    return {
        type: "EventCreation/SetDate",
        payload: payload
    }
}