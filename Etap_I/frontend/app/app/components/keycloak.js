import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080', // config mape można dodać
    realm: 'code_center_realm',
    clientId: 'code_app',
});

export default keycloak;