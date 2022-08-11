/**
 * Return all available & unavailable users available at timeStamp in usersAvailability
 * @param {Number} timeStamp
 * @param {[]} usersAvailability
 * @returns {[]}
 */
export function usersAvailableAt(timeStamp, usersAvailability) {
    let availables = [];
    let unavailables = [];
    if (Array.isArray(usersAvailability)) {
        usersAvailability.forEach((entry) => {
            if (entry.availableSlots && entry.availableSlots.includes(timeStamp)) {
                if (entry.userInfo) {
                    availables.push(entry.userInfo.name);
                } else {
                    availables.push(entry.user);
                }
            } else {
                if (entry.userInfo) {
                    unavailables.push(entry.userInfo.name);
                } else {
                    unavailables.push(entry.user);
                }
            }
        })
    }
    return {availables: availables, unavailables: unavailables};
}

/**
 * Return a fraction of all users available at timeStamp, 1 if all users are available
 * @param {Number} timeStamp
 * @param {[]} usersAvailability
 * @returns {Number}
 */
export function fractionOfUsersAvailableAt(timeStamp, usersAvailability) {
    let numAvailable = 0;
    let numUsers = 0;
    if (Array.isArray(usersAvailability)) {
        numUsers = usersAvailability.length;
        usersAvailability.forEach((entry) => {
            if (entry.availableSlots && entry.availableSlots.includes(timeStamp)) {
                numAvailable = numAvailable + 1;
            }
        })
    }

    return numUsers ? (numAvailable / numUsers) : 0;
}