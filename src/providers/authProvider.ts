// authProvider.js
import { Configuration } from 'msal';
import { MsalAuthProvider } from 'react-aad-msal';

// Msal Configurations
const config: Configuration = {
    auth: {
        clientId: `${process.env.REACT_APP_CLIENT_ID}`,
        authority: "https://login.microsoftonline.com/consumers",
        redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: []
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters);
