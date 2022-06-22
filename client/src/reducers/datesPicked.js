const initialState = new Date().toString()

const datesPicked = (dates = initialState, action) => {
    switch (action.type) {
        case 'EventCreation/SetDate':
            return action.payload;
        default:
            return dates;
    }
};

export default datesPicked;