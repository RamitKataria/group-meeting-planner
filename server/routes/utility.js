const axios = require('axios');
const ical = require('cal-parser');

function readICS(range, url) {

// offset between local timezone and UTC
    let offset = range[0][0].getTimezoneOffset() / 60;
    let RangeDates = [];
    let dates = [];

// list for finding events with the same dates in range
    for (let time of range) {
        dates.push(time[0].getUTCFullYear());
        dates.push(time[0].getUTCMonth());
        dates.push(time[0].getUTCDate());

        if (time[0].getUTCDate() !== time[1].getUTCDate()) {
            dates.push(time[1].getUTCFullYear());
            dates.push(time[1].getUTCMonth());
            dates.push(time[1].getUTCDate());

        }
    }

// list for finding events whose ranges include dates in range
    for (let time of range) {
        RangeDates.push(time[0].getUTCFullYear());
        RangeDates.push(time[0].getUTCMonth());
        RangeDates.push(time[0].getUTCDate());

        RangeDates.push(time[1].getUTCFullYear());
        RangeDates.push(time[1].getUTCMonth());

        RangeDates.push(time[1].getUTCDate());
    }
    // console.log(dates);
    // console.log(RangeDates);

// Find all the slots for range
    let slot = [];
    const hoursInMilliS = 60 * 60 * 1000;
    for (let time of range) {
        for (let timestamp = time[0].getTime(); timestamp < time[1].getTime(); timestamp = timestamp + hoursInMilliS) {
            slot.push(new Date(timestamp));
        }
    }

    console.log('Slots for range\n' + slot)

// Find event whose dtstart or dtend date is equal to the dates in range
    function FindDates(neededEvent, event) {
        for (let i = 0; i < dates.length; i += 3) {
            if ((event.dtstart.value.getUTCFullYear() === dates[i] && event.dtstart.value.getUTCMonth() === dates[i + 1]
                    && event.dtstart.value.getUTCDate() === dates[i + 2]) ||
                (event.dtend.value.getUTCFullYear() === dates[i] && event.dtend.value.getUTCMonth() === dates[i + 1]
                    && event.dtend.value.getUTCDate() === dates[i + 2])) {
                neededEvent.push(event);
            }
        }
    }

// Find event whose range includes the dates in range
    function FindRange(neededEvent, event) {
        for (let i = 0; i < RangeDates.length; i += 6) {

            // Same Year/Month as dates in range, dtstart dates smaller than start, dtend dates bigger than end
            if ((event.dtstart.value.getUTCFullYear() === RangeDates[i] && event.dtstart.value.getUTCMonth() === RangeDates[i + 1]
                    && event.dtstart.value.getUTCDate() < RangeDates[i + 2])
                && (event.dtend.value.getUTCFullYear() === RangeDates[i + 3] && event.dtend.value.getUTCMonth() === RangeDates[i + 4]
                    && event.dtend.value.getUTCDate() > RangeDates[i + 5])) {

                neededEvent.push(event);
            }

            // Same Year/Month(only dtstart) SameYear(dtend) as dates in range, dtstart dates smaller than start, dtend dates are in the next month
            if ((event.dtstart.value.getUTCFullYear() === RangeDates[i] && event.dtstart.value.getUTCMonth() === RangeDates[i + 1]
                    && event.dtstart.value.getUTCDate() < RangeDates[i + 2])
                && (event.dtend.value.getUTCFullYear() === RangeDates[i + 3] && event.dtend.value.getUTCMonth() - 1 === RangeDates[i + 4])) {

                neededEvent.push(event);
            }

            // Same Year/Month(only dtstart) SameYear(dtend) as dates in range, dtstart dates smaller than start, dtend dates are in the next month
            if ((event.dtstart.value.getUTCFullYear() === RangeDates[i] && event.dtstart.value.getUTCMonth() === RangeDates[i + 1]
                    && event.dtstart.value.getUTCDate() < RangeDates[i + 2])
                && (event.dtend.value.getUTCFullYear() - 1 === RangeDates[i + 3])) {

                neededEvent.push(event);
            }

            if ((event.dtstart.value.getUTCFullYear() === RangeDates[i] && event.dtstart.value.getUTCMonth() + 1 === RangeDates[i + 1])
                && (event.dtend.value.getUTCFullYear() === RangeDates[i + 3] && event.dtend.value.getUTCMonth() === RangeDates[i + 4]
                    && event.dtend.value.getUTCDate() > RangeDates[i + 5])) {

                neededEvent.push(event);
            }

            if ((event.dtstart.value.getUTCFullYear() + 1 === RangeDates[i])
                && (event.dtend.value.getUTCFullYear() === RangeDates[i + 3] && event.dtend.value.getUTCMonth() === RangeDates[i + 4]
                    && event.dtend.value.getUTCDate() > RangeDates[i + 5])) {

                neededEvent.push(event);
            }

        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the same year/month
    function SameYearMonthNotAvailable(busySlot, event) {
        if (event.dtstart.value.getUTCFullYear() === event.dtend.value.getUTCFullYear() &&
            event.dtstart.value.getUTCMonth() === event.dtend.value.getUTCMonth()) {

            SameDate(busySlot, event)
            Equal1(busySlot, event)
            greater1(busySlot, event)
        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the same year/month/date
    function SameDate(busySlot, event) {
        if (event.dtstart.value.getUTCDate() === event.dtend.value.getUTCDate()) {
            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = event.dtstart.value.getUTCHours(); i < event.dtend.value.getUTCHours(); i++) {
                    //console.log(event.dtstart.value.getUTCDate());
                    //console.log(new Date(year, month - 1, event.dtstart.value.getUTCDate(), i - offset, 0));
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = event.dtstart.value.getUTCHours(); i <= event.dtend.value.getUTCHours(); i++) {
                    //console.log(event.dtstart.value.getUTCDate());
                    //console.log(new Date(year, month - 1, event.dtstart.value.getUTCDate(), i - offset, 0));
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));
                }
            }
        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the same year/month && dtstart date = dtend date -1
    function Equal1(busySlot, event) {
        if (event.dtstart.value.getUTCDate() === event.dtend.value.getUTCDate() - 1) {
            for (let i = event.dtstart.value.getUTCHours(); i <= 23; i++) {
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));
            }
            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = event.dtend.value.getUTCHours() - 1; i >= 0; i--) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = event.dtend.value.getUTCHours(); i >= 0; i--) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));
                }
            }

        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the same year/month && dtend date - dtstart date > 1
    function greater1(busySlot, event) {
        if (event.dtend.value.getUTCDate() - event.dtstart.value.getUTCDate() > 1) {
            for (let i = event.dtstart.value.getUTCHours(); i < 24; i++) {
                //console.log(event.dtstart.value.getUTCHours())
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));
            }

            for (let j = event.dtstart.value.getUTCDate() + 1; j < event.dtend.value.getUTCDate(); j++) {
                for (let i = 0; i < 24; i++) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), j, i - offset, 0));
                }
            }

            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = event.dtend.value.getUTCHours() - 1; i >= 0; i--) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = event.dtend.value.getUTCHours(); i >= 0; i--) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            }
        }
    }


// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
    function diffMonthNotAvailable(busySlot, event) {
        if (event.dtstart.value.getUTCMonth() !== event.dtend.value.getUTCMonth()) {
            //for event.dtstart
            dtstartE31(busySlot, event);
            dtstartE30(busySlot, event);
            dtstartS30(busySlot, event);

            //for event dtend
            dtendE1(busySlot, event);
            dtendE2(busySlot, event);
            dtendG2(busySlot, event);


        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtstart Date = 31
    function dtstartE31(busySlot, event) {
        if (event.dtstart.value.getUTCDate() === 31) {
            for (let i = event.dtstart.value.getUTCHours(); i < 24; i++) {
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));

            }
        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtstart Date = 31-1
    function dtstartE30(busySlot, event) {
        if (event.dtstart.value.getUTCDate() + 1 === 31) {
            for (let i = event.dtstart.value.getUTCHours(); i < 24; i++) {
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));

            }

            for (let i = 0; i < 24; i++) {
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), 31, i - offset, 0));
            }

        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtstart Date < 31-1
    function dtstartS30(busySlot, event) {
        if (31 - event.dtstart.value.getUTCDate() > 1) {
            for (let i = event.dtstart.value.getUTCHours(); i < 24; i++) {
                busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), event.dtstart.value.getUTCDate(), i - offset, 0));

            }
            for (let j = event.dtstart.value.getUTCDate() + 1; j < 32; j++) {
                for (let i = 0; i < 24; i++) {
                    busySlot.push(new Date(event.dtstart.value.getUTCFullYear(), event.dtstart.value.getUTCMonth(), j, i - offset, 0));
                }
            }

        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtend Date  = 1
    function dtendE1(busySlot, event) {
        if (event.dtend.value.getUTCDate() === 1) {
            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = 0; i < event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = 0; i <= event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            }
        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtend Date  = 1+1
    function dtendE2(busySlot, event) {
        if (event.dtend.value.getUTCDate() - 1 === 1) {

            for (let i = 0; i < 24; i++) {
                busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), 1, i - offset, 0));
            }

            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = 0; i < event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = 0; i <= event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            }

        }
    }

// Find the nonavailable slots for event whose dtstart and dtend dates are in the different month(maybe also in the different year)
// dtend Date  -1 > 1
    function dtendG2(busySlot, event) {
        if (event.dtend.value.getUTCDate() - 1 > 1) {

            for (let j = 1; j < event.dtend.value.getUTCDate(); j++) {
                for (let i = 0; i < 24; i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), j, i - offset, 0));
                }
            }

            if (event.dtend.value.getUTCMinutes() === 0) {
                for (let i = 0; i < event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            } else if (event.dtend.value.getUTCMinutes() !== 0) {
                for (let i = 0; i <= event.dtend.value.getUTCHours(); i++) {
                    busySlot.push(new Date(event.dtend.value.getUTCFullYear(), event.dtend.value.getUTCMonth(), event.dtend.value.getUTCDate(), i - offset, 0));

                }
            }

        }
    }


    const promise = axios.get(url);


    const data = promise.then((response) => {
        const parsed = ical.parseString(response.data);
        let neededEvent = [];

        // console.log('Parsed ICS\n' + response.data)

        for (const event of parsed.events) {
            FindDates(neededEvent, event);
            FindRange(neededEvent, event);

        }

        //return an array without duplicate neededEvent
        let uniqueNeeded = [...new Set(neededEvent)]
        // console.log(uniqueNeeded);

        let busySlot = [];
        for (let event of uniqueNeeded) {
            SameYearMonthNotAvailable(busySlot, event);
            diffMonthNotAvailable(busySlot, event)
        }


        // delete all the not available slots from all the slot
        for (let busy of busySlot) {
            slot = slot.filter((el) => el.valueOf() !== busy.valueOf());
        }

        let finalSlot = [];

        for (let time of slot) {
            finalSlot.push(time.getTime());
        }


        // console.log(busySlot);
        // console.log(slot);
        // console.log(finalSlot);

        return finalSlot;

    }).catch((error) => {
        throw new Error(error.message);
    });

    return data;

}

module.exports = readICS;
