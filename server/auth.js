const fs = require('fs');
const { initializeApp, applicationDefault} = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");


try {
    fs.writeFileSync(
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        process.env.GOOGLE_APPLICATION_CREDENTIALS_CONTENT, 'utf8');
} catch (err) {
    console.error(err);
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
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error(
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.'
        );
        res.status(403).send('Unauthorized');
        return;
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
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        req.user = await auth.verifyIdToken(idToken);
        next();
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    }
};

module.exports = { validateFirebaseIdToken };
