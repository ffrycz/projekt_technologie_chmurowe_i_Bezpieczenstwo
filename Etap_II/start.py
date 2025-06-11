import subprocess

directories = [
    "api/",
    "db/",
    "frontend/",
    "keycloak/",
    "keycloak-db/"
]

for directory in directories:
    print(f"Startuję {directory}...")
    subprocess.run(["kubectl", "apply", "-f", directory], check=True)