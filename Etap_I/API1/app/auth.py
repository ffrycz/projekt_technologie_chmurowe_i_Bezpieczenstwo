from flask import Flask, request, jsonify
from functools import wraps
from jwt import decode, PyJWKClient

# Konfiguracja Keycloak
KEYCLOAK_URL = "http://keycloak:8080"
REALM = "code_center_realm"
AUDIENCE = "code_app_api"

JWKS_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"
ISSUER = f"{KEYCLOAK_URL}/realms/{REALM}"

jwk_client = PyJWKClient(JWKS_URL)

# Dekorator do ochrony endpointów
def keycloak_protect(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization", None)
        if not auth or not auth.startswith("Bearer "):
            return jsonify({"error": "Missing token"}), 401
        token = auth.split()[1]

        try:
            signing_key = jwk_client.get_signing_key_from_jwt(token)
            decoded = decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                audience=AUDIENCE,
                issuer=ISSUER
            )
            request.user = decoded  # Jeśli chcesz mieć dostęp do danych użytkownika
        except Exception as e:
            return jsonify({"error": str(e)}), 401

        return f(*args, **kwargs)
    return decorated