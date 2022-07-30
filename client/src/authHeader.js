import {getAuth} from "firebase/auth";

async function getAuthHeader() {
    const user = getAuth().currentUser
    if (user) {
        return 'Bearer ' + await user.getIdToken()
    }
    return ''
}

export { getAuthHeader }
