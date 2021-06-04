import React from "react";

import { authProvider } from './../providers/authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { IAzureADFunctionProps } from 'react-aad-msal';

export const AuthDropDown = () => {

    const inner: (account: IAzureADFunctionProps) => (any) = (account: IAzureADFunctionProps) => {
        switch (account.authenticationState) {
            case AuthenticationState.Authenticated:
                return (
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {account.accountInfo?.account.name}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <button className="btn navbar-btn line_btn" onClick={account.logout}>Logout</button>
                        </div>
                    </li>
                );
            case AuthenticationState.Unauthenticated:
                return (
                    <li className="nav-item">
                        <button className="btn navbar-btn line_btn" onClick={account.login}>Login</button>
                    </li>
                );
            case AuthenticationState.InProgress:
            default:
                return (
                    <li className="nav-item">
                        Logging in ...
                    </li>
                );
        }
    }

    return (
        <AzureAD provider={authProvider} forceLogin={false}>
            { inner}
        </AzureAD>
    );
}