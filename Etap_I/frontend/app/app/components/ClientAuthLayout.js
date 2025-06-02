// app/components/ClientAuthLayout.js
'use client';

import { useKeycloak } from '@react-keycloak/web';
import KeycloakWrapper from './KeycloakWrapper';
import Navigation from './Navigation';

export default function ClientAuthLayout({ children }) {
    return (
        <KeycloakWrapper>
            <AuthContent>{children}</AuthContent>
        </KeycloakWrapper>
    );
}

function AuthContent({ children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!keycloak) return <p>Loading Keycloak...</p>;

    return (
        <div className={"flex w-full h-max justify-center align-middle flex-col"}>
            {keycloak.authenticated ? (
                <>
                    <Navigation />
                    {children}
                </>
            ) : (
                <>
                    <div className={"text-8xl font-bold mt-10 w-full justify-center"} >You are not logged in</div>
                    <button className={"bg-blue-800 h-20 w-48 rounded-2xl text-2xl"} onClick={() => keycloak.login()}>Log In</button>
                </>
            )}
        </div>
    );
}
