import Keycloak from 'keycloak-js';

const keycloakConf = new Keycloak({
    url: 'http://localhost:8080', // config mape można dodać
    realm: 'code_center_realm',
    clientId: 'code_app',
});

export default keycloakConf;