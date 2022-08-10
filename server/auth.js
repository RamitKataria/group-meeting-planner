const fs = require('fs');
const { initializeApp, applicationDefault} = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");


const serviceAccountCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_CONTENT;
const serviceAccountCredentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!fs.existsSync(serviceAccountCredentialsPath) ||
    fs.readFileSync(serviceAccountCredentialsPath, 'utf8') !== serviceAccountCredentials) {
    try {
        fs.writeFileSync(serviceAccountCredentialsPath, serviceAccountCredentials, 'utf8');
    } catch (err) {
        console.error(err);
    }
}


const app = initializeApp({
    credential: applicationDefault()
});

const auth = getAuth();



// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        console.log('Unencrypted request')
        return next();
    }

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.log(
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.'
        );
        return next();
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if(req.cookies) {
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        return next();
    }

    try {
        req.user = await auth.verifyIdToken(idToken);
        return next();
    } catch (error) {
        console.log('Error while verifying Firebase ID token:', error);
        req.user = null;
        return next();
        // res.status(403).send('Unauthorized');
    }
};

const deleteUserInFirebase = async (uid) => {
    return await auth.deleteUser(uid);
}

const confirmAuthenticated = (req, res, next) => {
    if (!req.user || req.user.uid !== req.params.userID) {
        return res.status(403).send('Unauthorized');
    }
    return next();
}

module.exports = { validateFirebaseIdToken, deleteUserInFirebase, confirmAuthenticated };
