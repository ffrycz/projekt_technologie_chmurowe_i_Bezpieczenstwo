import subprocess
import sys

directories = [
    "api/",
    "db/",
    "frontend/",
    "keycloak/",
    "keycloak-db/"
]

if sys.argv[1] == "1":
    option = "apply"
else:
    option = "delete"

for directory in directories:
    print(f"Startuję {directory}...")
    subprocess.run(["kubectl", option, "-f", directory], check=True)