import subprocess
import sys
from time import sleep

directories = [
    "api/",
    "db/",
    "frontend/",
    "keycloak/",
    "keycloak-db/"
]

db_files_to_delete_on_stop = [
    "db/db-deployment.yml",
    "db/db-service.yml",
    "db/db-secret.yml",
    "db/db-configMap.yml",
    "keycloak-db/kc-db-secret.yml",
    "keycloak-db/postgres-deployment.yml",
    "keycloak-db/postgres-service.yml"
]

def start():
    for directory in directories:
        print(f"Startuję zasoby w katalogu {directory}...")
        subprocess.run(["kubectl", "apply", "-f", directory], check=True)
    print("Zaczekaj chwilę na pełne uruchomienie wszystkiego...")
    sleep(15.0)
    print("Teraz powinno już działać.")

def stop():

    for f_path in db_files_to_delete_on_stop:
        print(f"Zamykam {f_path}...")
        subprocess.run(["kubectl", "delete", "-f", f_path, "--ignore-not-found=true"], check=True)


    for directory in directories:
        if directory != "db/" and directory != "keycloak-db/":
            print(f"Zamykam zasoby w katalogu {directory}...")
            subprocess.run(["kubectl", "delete", "-f", directory, "--ignore-not-found=true"], check=True)

    print("Zakończono zamykanie zasobów.")
    sys.exit(0)

if sys.argv[1] == "1" or sys.argv[1] == "on":
    start()
elif sys.argv[1] == "0" or sys.argv[1] == "off":
    stop()

