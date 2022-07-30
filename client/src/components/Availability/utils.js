/**
 * Return all available & unavailable users available at timeStamp in usersAvailability
 * @param {Number} timeStamp 
 * @param {[]} usersAvailability 
 * @returns {[]}
 */
export function usersAvailableAt(timeStamp, usersAvailability) {
    var availables = [];
    var unavailables = [];
    if (Array.isArray(usersAvailability)) {
        usersAvailability.forEach( (entry) => {
            if (entry.availableSlots && entry.availableSlots.includes(timeStamp)) {
                if (entry.name) { // TODO: displayName?
                    availables.push(entry.name);
                } else {
                    availables.push(entry.user);
                }
            } else {
                if (entry.name) { // TODO: displayName?
                    unavailables.push(entry.name);
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
    var numAvailable = 0;
    var numUsers = 0; 
    if (Array.isArray(usersAvailability)) {
        numUsers = usersAvailability.length; 
        usersAvailability.forEach( (entry) => {
            if (entry.availableSlots && entry.availableSlots.includes(timeStamp)) {
                numAvailable = numAvailable + 1; 
            }
        })
    }

    return numUsers ? (numAvailable / numUsers) : 0;
}